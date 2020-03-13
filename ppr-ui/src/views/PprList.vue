<template>
  <v-list>
    <ppr-list-item />
    <ppr-list-item />
    <ppr-list-item />
    <ppr-list-item />
  </v-list>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import PprListItem from '@/views/PprListItem.vue'

export default createComponent({
  components: { PprListItem },
  setup() {
    return {}
  }
})

</script>

<style lang="scss" scoped>
.ppr-list-item {
  border: 1px solid bisque;
}

.list-card {
  border: 1px solid bisque;
}

// Address Block Layout
.address-block {
  display: flex;
}

.address-block__info {
  flex: 1 1 auto;
}
</style>
