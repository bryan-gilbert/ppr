"""A module that provides methods for accessing the Auth API and providing the logged in user details."""

import http
import json
import logging

import fastapi
import fastapi.security
import fastapi.security.http
import requests
from pydantic import BaseModel  # pylint:disable=no-name-in-module

import config


logger = logging.getLogger(__name__)

bearer_scheme = fastapi.security.HTTPBearer()


def check_auth_response(response: requests.Response):
    """Review the response from the external API and throw an error if it was forbidden or unauthorized."""
    if response.status_code in [http.HTTPStatus.UNAUTHORIZED, http.HTTPStatus.FORBIDDEN]:
        try:
            body = response.json()
            description = body['description'] if 'description' in body else None
        except json.decoder.JSONDecodeError:
            description = None

        raise fastapi.HTTPException(
            status_code=response.status_code, detail=description
        )


def get_user_from_auth(auth: fastapi.security.http.HTTPAuthorizationCredentials = fastapi.Depends(bearer_scheme)):
    """Make a request to Auth API and return the response body."""
    auth_response = requests.get('{}/users/@me'.format(config.AUTH_API_URL),
                                 headers={'Authorization': '{} {}'.format(auth.scheme, auth.credentials)})

    check_auth_response(auth_response)
    if not auth_response:  # status_code is unsuccessful
        logger.error('Get User call failed unexpectedly with status {}.  Response body: {}'.format(
            auth_response.status_code, auth_response.text))
        raise fastapi.HTTPException(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)

    return auth_response.json()


def get_current_user(auth_api_user: dict = fastapi.Depends(get_user_from_auth), account_id: str = fastapi.Header(None)):
    """Parse the provided dict into a User instance."""
    return User(user_id=auth_api_user['keycloakGuid'], user_name=auth_api_user['username'], account_id=account_id)


class User(BaseModel):
    """Represents the minimal user details provided by the Auth API."""

    user_id: str
    user_name: str
    account_id: str = None
