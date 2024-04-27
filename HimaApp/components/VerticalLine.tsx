import { View, ViewStyle } from "react-native";

/** Propsの型定義 */
interface PropsType {
    style?: ViewStyle;
}

/**
 * NOTE: VerticalLine
 * => 垂直な縦線 Component
 */
const VerticalLine = (props: PropsType) => {
    /** DefaultStyle: グレーの縦線 */
    const defaultStyle: ViewStyle = {
        width: 2, /* 縦線の幅を設定する */
        height: 12, /* コンポーネントの高さに合わせる */
        backgroundColor: "#287A5C" /* 縦線の色を指定 */
    };

    return <View style={props.style ? props.style : defaultStyle} />;
};

export default VerticalLine;