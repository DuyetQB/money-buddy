import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    interpolate,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { ThemedView } from '../ThemedView';
import { ThemeColors } from '@/constants/ThemeColors';
import { styles } from './styles';
import { ThemedText } from '../ThemedText';
import { width } from '@/utils/common';

type PieChartProps = {
    size?: number;
    strokeWidth?: number;
    showContent?: boolean,
    colors?: any[]
    dataChart?: any[]
};

export type PieChartDataItem = {
    color: string;
    percent: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type PieChartData = PieChartDataItem[];

export const PieChartSegment: FC<{
    center: number;
    radius: number;
    strokeWidth: number;
    color: string;
    circumference: number;
    angle: number;
    percent: number;
    progress: Animated.SharedValue<number>;
}> = ({
    center,
    radius,
    strokeWidth,
    circumference,
    color,
    angle,
    percent,
    progress,
}) => {
        const animatedProps = useAnimatedProps(() => {
            const strokeDashoffset = interpolate(
                progress.value,
                [0, 1],
                [circumference, circumference * (1 - percent)],
            );
            const rotateAngle = interpolate(progress.value, [0, 1], [0, angle]);

            return {
                strokeDashoffset,
                transform: [
                    { translateX: center * 1.06 },
                    { translateY: center * 2 },
                    { rotate: `${rotateAngle}deg` },
                    { translateX: -center },
                    { translateY: -center },
                ],
            };
        });

        return (
            <AnimatedCircle
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                stroke={color}
                strokeDasharray={circumference}
                originX={center}
                originY={center}

                // @ts-ignore
                animatedProps={animatedProps}
            />
        );
    };

export const PieChart = ({ size = 200, strokeWidth = 20, showContent = false, dataChart = [] }: PieChartProps) => {
    const progress = useSharedValue(0);
    const [data, setData] = React.useState<PieChartData>([]);
    const [startAngles, setStartAngles] = React.useState<number[]>([]);
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const refresh = () => {
        const total = dataChart?.reduce((a, b) => a + b.value, 0);

        let angle = 0;
        const angles: number[] = [];
        dataChart?.forEach((item: any) => {
            angles.push(angle);
            angle += item.value * 360;
        });

        const pieValue = dataChart?.map((rc) => {
            return {
                color: rc.color,
                percent: (rc.value / total)
            }
        })

        setData(pieValue);
        setStartAngles(angles);

        progress.value = 0;
        progress.value = withTiming(1, {
            duration: 1000,
        });
    };

    const caculatePercent = (value: number) => {
        const record = dataChart?.map((rc: any) => {
            return rc.value
        })

        const total = record.reduce(reducer)

        return Math.round(value / total * 100)
    }

    function reducer(accumulator: any, currentValue: any, index: number) {
        return accumulator + currentValue;
    }


    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={{
            flex: 1,
            marginVertical: 40
        }}>
            <ThemedView style={{
                height: 400,
                flex: 1,
                padding: 10,
                width: width
            }}>
                <Svg viewBox={`0 0 ${size} ${size}`} fill={ThemeColors.greenLight} style={{ zIndex: -1 }}>
                    {data.map((item, index) => (
                        <PieChartSegment
                            key={`${item.color}-${index}`}
                            center={center}
                            radius={radius}
                            circumference={circumference}
                            angle={startAngles[index]}
                            color={item.color}
                            percent={item.percent}
                            strokeWidth={strokeWidth}
                            progress={progress}

                        />
                    ))}
                </Svg>
                {showContent && (
                    <ThemedView style={styles.containerContent
                    }>
                        {dataChart?.map((rc: any, index: number) => (
                            <ThemedView key={index} style={styles.content
                            }>
                                <ThemedView style={[styles.radius, { backgroundColor: rc.color }]}></ThemedView>
                                <ThemedText>{caculatePercent(rc.value) || 0} %</ThemedText>
                                <ThemedText>{rc.label}</ThemedText>
                            </ThemedView>
                        ))}

                    </ThemedView>
                )}
            </ThemedView>
        </View>
    );
};
