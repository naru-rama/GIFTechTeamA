import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from '@/components/Themed';
import SkiaChart, { SVGRenderer } from '@wuba/react-native-echarts/skiaChart';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';

echarts.use([SVGRenderer, LineChart, GridComponent]);

export default function HimaData() {
  const skiaRef = useRef(null);

  useEffect(() => {
    const option = {
      xAxis: { type: 'category', data: ['月', '火', '水', '木', '金', '土', '日'] },
      yAxis: { type: 'value' },
      series: [{ data: [0, 5, 10, 20, 30], type: 'line' }]
    };

    let chart = null; 

    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 400,
      });

      chart.setOption(option);
    }

    return () => chart?.dispose();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>今週のヒマ</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.content}>
        <View style={styles.chartContainer}>
          <SkiaChart ref={skiaRef} /> 
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="過去のヒマ (集計されたデータ)" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 60,
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  separator: {
    height: 2,
    backgroundColor: '#ddd',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
