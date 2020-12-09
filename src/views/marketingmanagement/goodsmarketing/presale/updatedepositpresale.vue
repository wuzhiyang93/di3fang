<template>
  <editdepositpresale addOrUpdate="1" :id="this.$route.query.id"/>
</template>

<script>
  import editdepositpresale from './editdepositpresale'

  export default {
    components: {editdepositpresale},
  }
</script>
