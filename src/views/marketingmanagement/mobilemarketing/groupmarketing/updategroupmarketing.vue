<template>
  <editgroupmarketing addOrUpdateOrDetail="1" :id="this.$route.query.id"/>
</template>

<script>
  import editgroupmarketing from './editgroupmarketing'

  export default {
    components: {editgroupmarketing},
  }
</script>
