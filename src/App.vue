<template>
  <v-app>
    <v-app-bar app>
      <v-tabs
        fixed-tabs
        background-color="primary"
        dark
        icons-and-text
      >
        <v-tab router :to="{ name: 'booking' }" exact>
          1
          <v-icon>mdi-golf</v-icon>
        </v-tab>
        <v-tab router :to="{ name: 'tour' }" exact>
          2
          <v-icon>mdi-golf-cart</v-icon>
        </v-tab>
        <v-tab router :to="{ name: 'course' }" exact>
          3
          <v-icon>mdi-golf-tee</v-icon>
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-content style="padding-top:56px !important">
      <v-container class="" >
        <router-view></router-view>
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  data: () => ({
    //
  })
};
</script>