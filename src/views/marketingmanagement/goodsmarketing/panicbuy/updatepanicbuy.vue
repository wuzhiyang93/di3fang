<template>
  <editpanicbuy addOrUpdate="1" :id="this.$route.query.id"/>
</template>

<script>
  import editpanicbuy from './editpanicbuy'

  export default {
    components: {editpanicbuy},
  }
</script>
