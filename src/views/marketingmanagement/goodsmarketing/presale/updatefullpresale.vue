<template>
  <editfullpresale addOrUpdate="1" :id="this.$route.query.id"/>
</template>

<script>
  import editfullpresale from './editfullpresale'

  export default {
    components: {editfullpresale},
  }
</script>
