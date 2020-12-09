<template>
  <editfulldown addOrUpdate="1" :id="this.$route.query.id"/>
</template>

<script>
  import editfulldown from './editfulldown'

  export default {
    components: {editfulldown},
  }
</script>
