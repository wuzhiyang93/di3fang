<template>
  <editfallmarketing addOrUpdate="1" :id="this.$route.query.id"/>
</template>

<script>
  import editfallmarketing from './editfallmarketing'

  export default {
    components: {editfallmarketing},
  }
</script>
