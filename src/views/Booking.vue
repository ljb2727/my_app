<template>
    <div class="booking" style="width:100%">
        <v-dialog
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            offset-y="offset-y"
            readonly="readonly"
            min-width="290px">
            <template v-slot:activator="{ on }">
                <v-card v-on="on" outlined="outlined" :ripple="false" tile="tile">
                    <v-list-item class="grow pa-0">
                        <v-list-item-avatar class="mx-0">
                            <v-icon>mdi-calendar</v-icon>
                        </v-list-item-avatar>
                        <span v-if="dates.length == 0">날짜를 선택해주세요.</span>

                        <v-list-item-content>
                            <v-list-item-title>
                                <v-chip-group multiple="multiple" column="column">
                                    <v-chip
                                        v-for="(date,index) in dates"
                                        :key="index"
                                        close="close"
                                        :ripple="false"
                                        small="small"
                                        @click:close="myClose(index)">
                                        {{ date }}
                                    </v-chip>
                                </v-chip-group>

                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </template>
            <v-alert
                v-if="date_alert"
                type="error"
                dense="dense"
                tile="tile"
                style="margin-bottom:-2px;z-index:1;">
                최대 3일 까지 선택 가능합니다.
            </v-alert>
            <v-date-picker
                v-model="dates"
                multiple="multiple"
                no-title="no-title"
                scrollable="scrollable"
                locale="kr-kr"
                :min="toDay"
                @click:date="checkDate">
                <v-spacer></v-spacer>
                <v-btn text="text" color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text="text" color="primary" @click="save(dates)">OK</v-btn>
            </v-date-picker>
        </v-dialog>

        <!-- 지역 -->
        <popup/>
        <!-- 시간&그린피 선택 -->
        <v-card
            outlined
            tile
            style="overflow:hidden"
        >
            <v-card-text>
                <div class="mb-4">{{rangeValue1[0]}}</div>
                <v-range-slider
                    class="range01"
                    v-model="rangeValue1"
                    min="5"
                    max="20"
                    thumb-label="always"
                    thumb-size="40"
                    color="primary"
                >
                <template v-slot:thumb-label="props">
                    <span style="color:#1f619b;position:relative;top:18px;">{{props.value}}시</span>
                </template>
                </v-range-slider>


                <v-range-slider
                    class="range01 mt-4"
                    v-model="rangeValue2"
                    min="0"
                    max="30"
                    thumb-label="always"
                    thumb-size="40"
                    color="primary"
                >
                <template v-slot:thumb-label="props">
                    <span
                        v-if="props.value == 0"
                        style="color:#1f619b;position:relative;top:18px;text-align:center"
                    >현장가</span>
                    <span v-else style="color:#1f619b;position:relative;top:18px;">{{props.value}}만원</span>
                </template>
                </v-range-slider>
            </v-card-text>
        </v-card>

        <div class="ma-4">
            <v-btn
                color="primary"
                block
                large
                depressed 
            >
            확인
            </v-btn>
        </div>
    </div>
</template>
<script>
    import popup from "../components/Booking_popup"
    export default {
        components: {
            popup,
        },
        data: () => ({
            dates: [],
            menu: false,
            menu2: false,
            chip2: true,
            date_alert: false,
            toDay: new Date().toISOString().substr(0, 10),
            //rangeSlider
            rangeValue1: [5,20],
            rangeValue2: [0,30],
            //popup
           
            tab: null,
            
            //tab2
            
        }),
        methods: {
            save(dates) {
                this.$refs.menu.save(dates)
            },
            checkDate() {
                if (this.dates.length > 3) {
                    this.date_alert = true
                    setTimeout(() => {
                        this.date_alert = false
                    }, 12000);
                    console.log('3over')
                    this.dates.splice(3, 1)
                } else {
                    this.date_alert = false
                }
            },
            myClose(index) {
                this.dates.splice(index, 1)
            },
        },
        watch: {
            rangeValue1(newVal, oldVal) {
                // left slider is being moved
                if(oldVal[0] !== newVal[0]) {
                    if (newVal[1] - newVal[0] < 3) {
                    this.rangeValue1[1] = oldVal[1] + 1
                    }
                }
                // right slider is being moved
                if(oldVal[1] !== newVal[1]) {
                    if (newVal[1] - newVal[0] < 3) {
                    this.rangeValue1[0] = oldVal[0] - 1
                    }
                }
            },
            rangeValue2(newVal, oldVal) {
                // left slider is being moved
                if(oldVal[0] !== newVal[0]) {
                    if (newVal[1] - newVal[0] < 3) {
                    this.rangeValue2[1] = oldVal[1] + 1
                    }
                }
                // right slider is being moved
                if(oldVal[1] !== newVal[1]) {
                    if (newVal[1] - newVal[0] < 3) {
                    this.rangeValue2[0] = oldVal[0] - 1
                    }
                }
            }
        }
    }
</script>
<style>
.v-btn.active{background-color: #05be52 !important;color: #fff !important}
.range01 .v-slider__thumb-label{background: none !important;}
.range01 .v-slider__thumb{width:22px;height:22px;left:-12px;}
.range01 .v-slider__thumb-container--active .v-slider__thumb:before{display:none;}
.range01 .v-slider__thumb-container:hover .v-slider__thumb:before{display:none;}
</style>