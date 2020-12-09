<template>
  <editfulldiscount addOrUpdate="1" :id="this.$route.query.id"/>
</template>

<script>
  import editfulldiscount from './editfulldiscount'

  export default {
    components: {editfulldiscount},
  }
</script>
