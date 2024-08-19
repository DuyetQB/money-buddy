
const data = [
    {
        name: "Eat & Drink",
        population: 12,
        color: "#68e5e1",
        legendFontColor: "#4ca6ff",
        legendFontSize: 15,
    },
    {
        name: "Electricity bill",
        population: 28,
        color: "#daa3ff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Water bill",
        population: 52,
        color: "#ff00b0",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Rent",
        population: 8,
        color: "#153e90",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Other",
        population: 11,
        color: "#ffd138",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];
const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(155, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

export const pieChartData = {
    data,
    chartConfig
}
