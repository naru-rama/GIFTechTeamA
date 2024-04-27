import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
import AddHimaModal from './AddHimaModal';
import { getAllHimaItems } from '../actions/HimaActions';
import { useRouter } from 'expo-router';

const TopBody = ({ }) => {
    const router = useRouter();
    const gapHeight = 80;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [himaItems, setHimaItems] = useState([]);
    useEffect(() => {
        getAllHimaItems().then((items) => {
            items = items.map((item, index) => {
                // console.log('index:', index, index % 2 === 0 ? -1 : 1);
                let position = {
                    bottom: gapHeight * index * -1 + 900,
                };

                // indexが偶数の場合は`left`に、奇数の場合は`right`にランダムな値を設定
                if (index % 2 === 0) {
                    position.left = Math.floor(Math.random() * 40) + "%";
                } else {
                    position.right = Math.floor(Math.random() * 40) + "%";
                }
                return {
                    id: item.id,
                    index: index,
                    text: item.name,
                    position: position,
                    deg: Math.random() * 40 - 20,
                };
            });
            // console.log('items:', items);
            setHimaItems(items);
        });
        console.log('items:', himaItems);
    }, []);
    const { width, height } = Dimensions.get('window');
    // console.log('width:', width);
    // console.log('height:', height);
    // const topAnim = useRef(new Animated.Value(94)).current;
    // useEffect(() => {
    //     Animated.timing(topAnim, {
    //       toValue: 0,
    //       duration: 10000,
    //       useNativeDriver: true,
    //     }).start();
    //   }, [topAnim]);

    // ランダムな位置を生成するヘルパー関数
    const RandomText = ({ phrase }) => {
        // console.log('RandomText', phrase);
        // -20度から20度の間でランダムな角度を生成

        return (
            <TouchableOpacity
                style={[
                    styles.randomTextContainer,
                    phrase.position,
                    { transform: [{ rotate: phrase.deg + "deg" }] },
                    // { backgroundColor: phrase.isNew ? 'yellow' : 'white' },
                ]}
                onPress={() => {
                    console.log('onPress:', phrase.id);
                    router.push({
                        pathname: '/himaIndex',
                        params: {
                            id: phrase.id,
                        },
                    })
                }}
            >
                <Text style={[
                    styles.randomText,
                    { color: phrase.isNew ? '#55FFE0' : '#F3D0FF' },
                    { borderColor: phrase.isNew ? '#55FFE0' : '#F3D0FF' },
                ]}>{phrase.text}</Text>
            </TouchableOpacity>
        );
    };
    // console.log('TopBody');
    useEffect(() => {
        const interval = setInterval(() => {
            setHimaItems(currentPhrases => {
                return currentPhrases.map(phrase => {
                    let bottomValue = phrase.position?.bottom + 10;
                    if (phrase.position?.bottom > 812) {
                        // get lowest bottom value
                        let items = currentPhrases.map((item) => item.position.bottom);
                        let lowest = Math.min(...items);

                        return {
                            ...phrase,
                            isNew: false,
                            position: {
                                ...phrase.position,
                                bottom: lowest - gapHeight, // ここで現在のtopから1引く
                                deg: Math.random() * 40 - 20,
                            },
                        };
                    }
                    return {
                        ...phrase,
                        position: {
                            ...phrase.position,
                            bottom: bottomValue,
                            deg: Math.random() * 40 - 20,
                        },
                    };
                });
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // phraseの高さを常に1ずつ上げる

    const addNewHimaItem = (newPhrase) => {
        if (!newPhrase) {
            return;
        }
        console.log('addNewHimaItem:', newPhrase);
        const targetHeight = 812 / 2;
        let newHimaItems = [];
        himaItems.forEach((phrase, index) => {
            // 新要素を中心に追加する
            let bottomValue = phrase.position.bottom;
            if (bottomValue > targetHeight) {
                bottomValue += gapHeight;
            } else {
                bottomValue -= gapHeight;
            }
            newHimaItems.push({
                ...phrase,
                position: {
                    ...phrase.position,
                    bottom: bottomValue,
                },
            });
        });
        newHimaItems.push({
            text: newPhrase,
            isNew: true,
            position: {
                bottom: targetHeight,
                left: "50%",
            },
        });
        // newItemをボトムの低い順で並び替え
        newHimaItems = newHimaItems.sort((a, b) => a.position.bottom - b.position.bottom);
        setHimaItems(newHimaItems);
    }


    // const phrases = [
    //     'やりたいことを見つけるタップしてみよう',
    //     '名前しか知らない人しかいない飲み会に参加する',
    //     '「頭髪の量稀薄で一番早いリモート掃除できる',
    //     // ... 他のフレーズを追加
    // ];

    return (
        <View style={styles.container}>
            {himaItems.map((phrase, index) => (
                <RandomText key={index} phrase={phrase} />
            ))}
            <TouchableOpacity style={styles.fab} onPress={() => {
                setIsModalVisible(true);
            }}>
                {/* <Text style={styles.fabText}>＋</Text> */}
                <Image
                    source={require('../assets/images/AddHimaImage.png')}
                    style={{

                    }}
                />
            </TouchableOpacity>
            <AddHimaModal
                // isVisible={true}
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAdd={(newPhrase) => {
                    console.log('newPhrase:', newPhrase);
                    addNewHimaItem(newPhrase);
                    setIsModalVisible(false);
                    // フレーズを追加
                    // setHimaItems((currentPhrases) => {
                    //     const newPhrases = [
                    //         ...currentPhrases,
                    //         {
                    //             text: newPhrase,
                    //             position: generateRandomPosition(),
                    //         },
                    //     ];
                    //     return newPhrases;
                    // });
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E64B8',
        paddingTop: 50, // ステータスバーの高さを考慮
        width: '100%',
    },
    randomTextContainer: {
        position: 'absolute',
        // padding: 8,
        borderRadius: 10,
        maxWidth: 240,
        backgroundColor: '#1E64B8',
    },
    randomText: {
        fontWeight: 'bold',
        fontSize: 16,
        // border
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 7,
        textAlign: 'center',
        lineHeight: 24,
    },
    fab: {
        position: 'absolute',
        // right: 20,
        bottom: 100,
        // backgroundColor: 'yellow',
        width: "100%",
        // height: 56,
        // borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 26,
        // elevation: 6,
        // shadowRadius: 4,
        // shadowOpacity: 0.3,
        // shadowColor: '#000',
        // shadowOffset: { height: 3, width: 0 },
    },
    fabText: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default TopBody;
