<template>
  <editthematic addOrUpdate="2" :id="this.$route.query.id"/>
</template>

<script>
  import editthematic from './editthematic'

  export default {
    components: {editthematic},
  }
</script>
