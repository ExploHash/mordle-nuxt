<template>
  <slot />
</template>

<style lang="less">  
  body {
    background-color: var(--light-white);
    font-family: 'Fruktur', cursive;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
  }

  :root {
    --pink: #ffbcb5;
    --orange: #fbd700;
    --blue: #7cc8c3;
    --green: #94d797;
    --white: #fdf4e4;
    --light-white: #fdf4e4;
    --gray: #948f8f;
    --dark-gray: #4d4d4d;
  }
</style>