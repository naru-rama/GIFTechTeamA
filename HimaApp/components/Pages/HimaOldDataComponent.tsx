import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';

interface CardComponentProps {
    month: number;
    week: number;
    himaStatus: string;
    himaTime: string;
    countOK: number;
    countNotNow: number;
    countNO: number;
    himaDayInTheWeek: string;
}
const CardComponent: React.FC<CardComponentProps> = ({ month, week, himaStatus, himaTime, countOK, countNotNow, countNO, himaDayInTheWeek }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} activeOpacity={0.2}>
            <View style={styles.cardWrap}>

                <View style={styles.leftSide}>
                    <View style={styles.upper}>
                        <View style={styles.upperLeft}>
                            <Text style={styles.text12}>{month}月{week}周目のヒマ</Text>
                            <Text style={styles.text20}>{himaStatus}</Text>
                        </View>
                        <View style={styles.upperRight}>
                            <Text style={styles.text10_2}>ヒマそうな時間</Text>
                            <View style={styles.timeWrap}>
                                <Text style={styles.text10_1}>{himaTime}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.text10_1}>通知にOK : {countOK}</Text>
                        <Text style={styles.text10_1}>今じゃない : {countNotNow}</Text>
                        <Text style={styles.text10_1}>通知にNO : {countNO}</Text>
                    </View>
                </View>

                <View style={styles.rightSide}>
                    <View style={styles.dayInTheWeekWrap}>
                        <Text style={styles.text24}>{himaDayInTheWeek}</Text>
                    </View>
                    <Text style={styles.text10_2}>一番ヒマな日</Text>
                </View>

            </View>
            <View style={styles.separator}></View>
        </TouchableOpacity>
    );
}


export default function HimaOldData() {
    return (
        <ScrollView style={styles.mainWrap}>

            <CardComponent
                month={3}
                week={2}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="金"
            />

            <CardComponent
                month={3}
                week={1}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="水"
            />

            <CardComponent
                month={2}
                week={4}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="月"
            />

            <CardComponent
                month={2}
                week={3}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="月"
            />

            <CardComponent
                month={2}
                week={2}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="火"
            />

            <CardComponent
                month={2}
                week={2}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="水"
            />

            <CardComponent
                month={2}
                week={1}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="木"
            />

            <CardComponent
                month={1}
                week={4}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="金"
            />


            <CardComponent
                month={1}
                week={4}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="金"
            />

            <CardComponent
                month={1}
                week={4}
                himaStatus="そんなにヒマジン"
                himaTime="15:00~17:00"
                countOK={429}
                countNotNow={8}
                countNO={8}
                himaDayInTheWeek="金"
            />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainWrap: {
        flex: 1,

        color: 'F3D0FF',
        backgroundColor: '#1E64B8',
        width: '100%',
    },


    cardContainer: {
        width: '100%',

        alignItems: 'center',
    },
    cardWrap: {
        width: '91%',
        height: 110,

        paddingTop: 4,
        paddingBottom: 4,

        alignItems: 'center',
        justifyContent: 'center',

        flexDirection: 'row',
    },
    leftSide: {
        width: '80%',
        height: '100%',

        paddingTop: 18,

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    upper: {
        paddingRight: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    upperLeft: {
        gap: 6,
    },
    upperRight: {
        gap: 4,
    },
    timeWrap: {
        width: 100,
        height: 24,
        borderRadius: 6,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#3F7BC3',
    },
    lower: {
        gap: 20,
        paddingBottom: 6,

        alignSelf: 'baseline',
        flexDirection: 'row',
    },
    rightSide: {
        gap: 4,
        paddingTop: 12,

        alignItems: 'center',
        justifyContent: 'center',
    },
    dayInTheWeekWrap: {
        width: 64,
        height: 64,
        borderRadius: 14,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#3F7BC3',
    },
    separator: {
        marginVertical: 3,
        height: 1,
        width: '91%',
        backgroundColor: '#F3D0FF',
    },


    text8: {
        color: '#F3D0FF',
        fontSize: 8,
        fontWeight: '700',
    },
    text10_1: {
        color: '#F3D0FF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.25,
    },
    text10_2: {
        color: '#F3D0FF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.25,
    },
    text12: {
        color: '#F3D0FF',
        fontSize: 12,
        fontWeight: '700',
    },
    text20: {
        color: '#F3D0FF',
        fontSize: 16,
        fontWeight: '700',
    },
    text24: {
        color: '#F3D0FF',
        fontSize: 24,
        fontWeight: '700',
    },
});
