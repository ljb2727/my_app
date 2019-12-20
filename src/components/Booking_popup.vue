<template>
    <v-dialog
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        transition="dialog-bottom-transition"
        fullscreen="fullscreen"
        hide-overlay="hide-overlay"
        readonly="readonly"
        min-width="290px">
        <template v-slot:activator="{ on }">
            <v-card v-on="on" outlined="outlined" :ripple="false" tile="tile" class="my-1">
                <v-list-item class="grow pa-0">
                    <v-list-item-avatar class="mx-0">
                        <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-avatar>
                    <span v-if="cnt == 0">지역을 선택해주세요.</span>
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-chip-group multiple="multiple" column="column">
                                <v-chip
                                    v-for="(item, index) in basePlace.filter(e => e.active == true)"
                                    :key="index"
                                    close="close"
                                    :ripple="false"
                                    small="small"
                                    @click:close="closeChips(item.name)">
                                    {{ item.name }}
                                </v-chip>
                            </v-chip-group>

                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </template>

        <v-card>
            <v-tabs
                fixed-tabs
                background-color="primary"
                dark="dark"
                icons-and-text
                height="56px"
                v-model="tab">
                <v-tab href="#tab-1">
                    11
                    <v-icon>mdi-golf</v-icon>
                </v-tab>
                <v-tab href="#tab-2">
                    2
                    <v-icon>mdi-golf-cart</v-icon>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item :transition="false" :reverse-transition="false" value="tab-1">
                    <v-container>
                        <v-row>
                            <v-col v-for="(item,index) in basePlace" :key="index" :cols="item.cols">
                                <v-btn
                                    block="block"
                                    large="large"
                                    tile="tile"
                                    color="gray"
                                    :class="{'active': item.active}"
                                    @click="selPlace(item.name, index)">{{item.name}}{{item.active}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card>
                        <v-footer fixed="fixed" padless="padless" class="font-weight-medium">
                            <v-col class="text-center pa-0" cols="12">
                                <v-chip
                                    class="ma-2"
                                    label="label"
                                    close="close"
                                    @click="closeChips(item.name)"
                                    @click:close="closeChips(item.name)"
                                    v-for="(item, index) in basePlace.filter(e => e.active == true)"
                                    :key="index">{{item.name}}</v-chip>
                            </v-col>
                            <v-btn
                                color="primary"
                                block="block"
                                large="large"
                                tile="tile"
                                @click="closePlace">완료{{cnt}}</v-btn>
                        </v-footer>
                    </v-card>
                </v-tab-item>

                <!-- 2nd tap -->
                <v-tab-item :transition="false" :reverse-transition="false" value="tab-2">
                        {{item}}
                    <v-list class="pa-0">
                        <v-list-item-group v-model="item" color="primary" mandatory>
                            <v-row no-gutters="no-gutters" style="flex-wrap: nowrap">
                                <v-col style="flex-basis: 130px;flex-grow:0">
                                    <v-list-item
                                        dense="dense"
                                        v-for="(region, index) in items"
                                        :key="index"
                                        :ripple="false"
                                    >
                                        {{region.region}}
                                    </v-list-item>
                                </v-col>
                                <v-col style="flex-grow:1">
                                    <v-list-item-group multiple>
                                        <v-list-item dense="dense" v-for="(sub,i) in items[0].list" :key="i">

                                            <template v-slot:default="{ active, toggle }">
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        {{sub}}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                                <v-list-item-action>
                                                    <v-checkbox
                                                    :input-value="active"
                                                    @click="toggle"
                                                    ></v-checkbox>
                                                </v-list-item-action>
                                            </template>

                                            
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-col>
                            </v-row>
                        </v-list-item-group>
                    </v-list>
                    <!-- <v-container>
                        <ul class="gegion" v-for="(item,index) in items" :key="index">
                            <li>{{item.region}}</li>
                            <ul class="sub">
                                <li v-for="(sub,i) in item.list" :key="i">
                                    <v-checkbox
                                        v-model="selected"
                                        :label="sub"
                                        :value="sub"
                                        dense="dense"
                                        hide-details="hide-details"
                                        :ripple="false"></v-checkbox>
                                </li>
                            </ul>
                        </ul>
                        <v-divider></v-divider>
                        {{selected}}
                    </v-container> -->
                </v-tab-item>
            </v-tabs-items>

        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        data: () => ({
            menu2: false,
            chip2: true,
            //popup
            basePlace: [
                {name:"경기/인천", index: "1", active: false, cols: "12"},
                {name:"강원", index: "2", active: false, cols: "6"},
                {name:"충청", index: "3", active: false, cols: "6"},
                {name:"경상", index: "4", active: false, cols: "6"},
                {name:"전라", index: "5", active: false, cols: "6"},
                {name:"제주", index: "6", active: false, cols: "6"}
            ],
            tab: null,
            cnt: 0,
            //tab2
            radios: "radio-0",
            item: 0,
            items: [
                {region: "경기도 전체", list:["경기1","경기2"]},
                {region: "용인권", list: ["용인1","용인2","용인3","용인4"]},
                {region: "여주권", list: ["여주1","여주2","여주3","여주4"]},
            ],
            selected: [],
        }),
        methods: {
            selPlace(e,i){
                //console.log(this.arrayPlace)
                if(this.basePlace[i].active == false){
                    if(this.cnt < 3){
                        this.basePlace[i].active = true
                        this.cnt++
                    }
                }else{
                    this.basePlace[i].active = false
                    this.cnt--
                }
                
            },
            closeChips(name){
                console.log(name)
                this.basePlace.forEach((e,i) => {
                    if(name == e.name){
                        this.basePlace[i].active = false
                        this.cnt--
                    }
                });
            },
            closePlace(){
                this.menu2 = false
            },
        },
    }
</script>
<style>
.v-btn.active{background-color: #05be52 !important;color: #fff !important}
.range01 .v-slider__thumb-label{background: none !important;}
.range01 .v-slider__thumb{width:22px;height:22px;left:-12px;}
.range01 .v-slider__thumb-container--active .v-slider__thumb:before{display:none;}
.range01 .v-slider__thumb-container:hover .v-slider__thumb:before{display:none;}
</style>
<style scoped>
ul,li{list-style: none;margin:0;padding:0}
ul.gegion{}
ul.gegion .sub li:first-child > div{margin-top: 0;}
</style>