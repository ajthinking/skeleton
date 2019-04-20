<template>
  <sl-vue-tree v-model="nodes"></sl-vue-tree>
</template>
<script>
export default {
  data() {
    return {
      nodes: [
        {
          title: "app",
          isExpanded: true,
          children: [
            {
              title: "User.php",
              isLeaf: true
            },
			{ title: "Car.php", isLeaf: true },
			{
				title: "Http",
				isExpanded: true,
				children: [
					{title: "UserController.php", isLeaf: true}
				]
			}
          ]
        },
        { title: "composer.json", isLeaf: true },
        { title: ".env", isLeaf: true, data: { visible: false } }
      ]
    };
  }
};
</script>