import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform,
    TouchableOpacity, Keyboard, Image, Modal, FlatList, Button
} from 'react-native';
import { Switch } from 'react-native-switch';
import { useNavigation } from '@react-navigation/native';
import { HimaChart } from '../HimaChart';
// import { Button } from 'react-native-elements';
import { HistoryButton } from '../HimaDataPage/HistoryButton';
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons';

export default function HimaSettingPage() {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledSec, setIsEnabledSec] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [selectedFirst, setSelectedFirst] = useState();
    const [selectedSecond, setSelectedSecond] = useState("");
    const [selectedThird, setSelectedThird] = useState("");
    const dataFirst = [
        { key: 1, value: '前回の' },
        { key: 2, value: '3回前の' },
    ];
    const dataSecond = [
        { key: 3, value: '通知から' },
        { key: 4, value: 'アクションから' },
        { key: 5, value: 'ヒマな時間から' },
    ];
    const dataThird = [
        { key: 11, value: '30分以上' },
        { key: 12, value: '1時間以上' },
        { key: 13, value: '6時間以上' },
    ];
    return (
        <View
            style={{
                minHeight: '100%',
                // flex: 1,
                // justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1E64B8',
            }}
        >
            {/* Header */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Text style={styles.backButtonText}>戻る</Text>
                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/title-push@x3.png')}
                    style={styles.topImage}
                />
                <View style={styles.registrationCountContainer}>
                    {/* <Text style={styles.registrationLabelText}>登録数</Text>
                    <Text style={styles.registrationCountText}>{himaItems.length}</Text> */}
                </View>
            </View>

            {/* Body */}
            <View
                style={{
                    width: '90%',
                }}
            >
                <Text
                    style={{
                        color: '#F3D0FF',
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginTop: 0,
                    }}
                >通知のスタイル</Text>
                <View
                    style={[styles.lightBlueContainer, { justifyContent: 'space-around' }]}>
                    <View
                        style={styles.screenMockWrapper}
                    >
                        <View
                            style={styles.screenMock}
                        >
                            {/* スクリーン的な */}
                        </View>
                        <Text
                            style={styles.screenMockText}
                        >ミニマム</Text>
                    </View>
                    <View
                        style={styles.screenMockWrapper}
                    >
                        <View
                            style={styles.screenMock}
                        >
                            {/* スクリーン的な */}
                        </View>
                        <Text
                            style={styles.screenMockText}
                        >ミドル</Text>
                    </View>
                    <View
                        style={styles.screenMockWrapper}
                    >
                        <View
                            style={styles.screenMock}
                        >
                            {/* スクリーン的な */}
                        </View>
                        <Text
                            style={styles.screenMockText}
                        >フル</Text>
                    </View>
                </View>

                <View
                    style={[styles.lightBlueContainer, {
                        justifyContent: 'space-between',
                        marginTop: 8,
                    }]}
                >
                    <Text
                        style={{
                            color: '#F3D0FF',
                            fontSize: 15,
                            fontWeight: 'bold',

                        }}
                    >
                        バイブレーション
                    </Text>
                    {/* <View style={styles.container}> */}
                    <Switch
                        value={isEnabled}
                        onValueChange={(val) => setIsEnabled(val)}
                        disabled={false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={26}
                        barHeight={30}
                        circleBorderWidth={0}
                        backgroundActive={'#F3D0FF'}
                        backgroundInactive={'gray'}
                        circleActiveColor={'#1E64B8'}
                        circleInActiveColor={'#1E64B8'}
                        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                        outerCircleStyle={{}} // style for outer animated circle
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                        switchWidthMultiplier={2.2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                    // switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                    />
                    {/* </View> */}
                </View>

                <Text
                    style={{
                        color: '#F3D0FF',
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}
                >知らせる間隔</Text>
                <View
                    style={[styles.lightBlueContainer, {
                        justifyContent: 'space-between',
                        // height: 100,
                    }]}
                >

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F3D0FF',
                            padding: 10,
                            borderRadius: 10,
                            width: 95,
                        }}
                    >
                        <Text
                            style={{
                                // marginRight: 4,
                                color: '#1E64B8',
                                left: 0,

                            }}
                        >
                            前回の
                        </Text>
                        <FontAwesome name="chevron-down" color={'#1E64B8'} style={{
                            right: -20,
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F3D0FF',
                            padding: 10,
                            borderRadius: 10,
                            width: 95,
                        }}
                    >
                        <Text
                            style={{
                                // marginRight: 4,
                                color: '#1E64B8',
                                left: 0,

                            }}
                        >
                            通知から
                        </Text>
                        <FontAwesome name="chevron-down" color={'#1E64B8'} style={{
                            right: -10,
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F3D0FF',
                            padding: 10,
                            borderRadius: 10,
                            width: 95,
                        }}
                    >
                        <Text
                            style={{
                                // marginRight: 4,
                                color: '#1E64B8',
                                left: 0,

                            }}
                        >
                            30分以上
                        </Text>
                        <FontAwesome name="chevron-down" color={'#1E64B8'} style={{
                            right: -10,
                        }} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        // column
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                        //縦を揃える

                    }}
                >

                    <Text
                        style={{
                            color: '#F3D0FF',
                            fontSize: 13,
                            fontWeight: 'bold',
                            verticalAlign: 'middle',
                            alignItems: 'center',
                        }}
                    >おやすみタイム</Text>
                    <Switch
                        value={isEnabledSec}
                        onValueChange={(val) => setIsEnabledSec(val)}
                        disabled={false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={24}
                        barHeight={26}
                        circleBorderWidth={0}
                        backgroundActive={'#F3D0FF'}
                        backgroundInactive={'gray'}
                        circleActiveColor={'#1E64B8'}
                        circleInActiveColor={'#1E64B8'}
                        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                        outerCircleStyle={{}} // style for outer animated circle
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                        switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                        switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                        switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                    />
                </View>
                <View
                    style={[styles.lightBlueContainer, {
                        justifyContent: 'space-between',
                        // height: 100,
                    }]}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F3D0FF',
                            padding: 10,
                            borderRadius: 10,
                            width: 100,
                        }}
                    // onPress={(e) => {e.preventDefault();}}
                    >
                        <Text
                            style={{
                                // marginRight: 4,
                                color: '#1E64B8',
                                left: 10,

                            }}
                        >
                            12:00
                        </Text>
                        <FontAwesome name="chevron-down" color={'#1E64B8'} style={{
                            right: -30,
                        }} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#F3D0FF',
                        }}
                    >
                        〜
                    </Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F3D0FF',
                            padding: 10,
                            borderRadius: 10,
                            width: 100,
                        }}
                    // onPress={(e) => {e.preventDefault();}}
                    >
                        <Text
                            style={{
                                // marginRight: 4,
                                color: '#1E64B8',
                                left: 10,

                            }}
                        >
                            12:00
                        </Text>
                        <FontAwesome name="chevron-down" color={'#1E64B8'} style={{
                            right: -30,
                        }} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 24,
                        justifyContent: 'space-around',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: 50,
                            backgroundColor: 'white',
                            width: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            handleBackPress();
                        }}
                    >

                        <View>
                            <Text
                                style={{
                                    color: '#1E64B8',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                                t>キャンセル</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            backgroundColor: '#F3D0FF',
                            width: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}
                    >

                        <View>
                            <Text
                                style={{
                                    color: '#1E64B8',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                                t>OK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    lightBlueContainer: {
        flexDirection: 'row',
        // even
        marginTop: 10,
        backgroundColor: '#3F7BC3',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    topImage: {
        width: 250,
        height: 120,
        resizeMode: 'contain',
        marginRight: 0,
        height: 80,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // paddingHorizontal: 10,
        marginTop: 50,
    },
    backButton: {
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 100,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#F2D0FF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registrationCountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 70,
        paddingBottom: 0,
    },

    screenMockWrapper: {
        width: 80
    },
    screenMock: {
        width: 80,
        height: 150,
        borderColor: '#F3D0FF',
        borderWidth: 1,
        borderRadius: 4,
    },
    screenMockText: {
        marginTop: 10,
        color: '#F3D0FF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    selectList: {
        backgroundColor: '#F3D0FF',
        borderWidth: 0,
        // backgroundColor: '#1E64B8',
        color: '#1E64B8',
        // alignItems: 'center',
        textAlign: 'left',
        padding: 0,
        margin: 0,
        fontSize: 10,
        justifyContent: 'space-between',
    }
})
