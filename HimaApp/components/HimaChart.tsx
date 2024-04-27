import { BarChart } from "react-native-gifted-charts";
import { View } from "react-native";

export const HimaChart = () => {
    const barData = [
    {value: 18,label: '月',frontColor: '#F3D0FF'},
    {value: 9,label: '火',frontColor: '#F3D0FF'},
    {value: 29,label: '水',frontColor: '#F3D0FF'},
    {value: 11,label: '木',frontColor: '#F3D0FF'},
    {value: 14,label: '金',frontColor: '#F3D0FF'},
    {value: 20,label: '土',frontColor: '#F3D0FF'},
    {value: 26,label: '日',frontColor: '#F3D0FF'},
    ];
    return (
        <View>
            <BarChart
            // showFractionalValues
            // showYAxisIndices
            noOfSections={4}
            // maxValue={400}
            yAxisThickness={0}
            xAxisThickness={0}
            barWidth={22}
            spacing={15}
            height={130}
            barBorderRadius={4}
            // width={230}
            yAxisTextStyle={{color: '#F3D0FF', fontWeight: '700'}}
            xAxisLabelTextStyle={{color: '#F3D0FF', fontWeight: '700'}}
            hideRules
            showLine={false}
            data={barData}
            isAnimated
            />
        </View>

    );
}