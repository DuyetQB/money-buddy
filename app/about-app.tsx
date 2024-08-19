import { Stack } from 'expo-router';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


export default function AboutAppScreen() {

    return (
        <ScrollView>
            <Stack.Screen options={{
                title: '', headerBackTitle: 'Back',

            }} />
            <ThemedView style={styles.container}>
                <ThemedView>

                    <Image source={require("@/assets/images/logo-about.png")} style={{
                        width: 120,
                        height: 120
                    }} />


                </ThemedView>
                <ThemedText style={styles.textTitle}>About Money Buddy</ThemedText>
                <ThemedView>
                    <ThemedText style={styles.textContent}>
                        Money Buddy is your personal financial companion designed to help you effortlessly manage your finances. Whether you're tracking your daily expenses, monitoring your income, or setting savings goals, Money Buddy makes financial management simple and intuitive. With an easy-to-use interface and powerful features, you can categorize your spending, visualize your financial habits, and gain insights into your money flow.

                        What sets Money Buddy apart from other financial apps is its focus on user-friendly functionality and personalized financial insights. Unlike other apps that can be overwhelming or cluttered with unnecessary features, Money Buddy keeps things straightforward, allowing you to focus on what truly matters: understanding and improving your financial health. The app offers customizable categories, real-time updates, and detailed reports, helping you stay on top of your finances without the hassle.

                        With Money Buddy, you’re not just tracking your money—you’re actively managing it. The app empowers you to make informed financial decisions, optimize your budget, and ultimately achieve your financial goals. Whether you're a student, a professional, or someone simply looking to take control of your finances, Money Buddy is the ideal tool to help you succeed financially.
                    </ThemedText>
                </ThemedView>

            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20
    },
    textTitle: {
        fontSize: 26,
        fontWeight: 700,
        marginVertical: 20
    },
    content: {

    },
    textContent: {
        fontSize: 18
    }
});
