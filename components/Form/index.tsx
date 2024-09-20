import { TextInput, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { ThemeColors } from '@/constants/ThemeColors';
import { SelectList } from 'react-native-dropdown-select-list';
import * as SQLite from 'expo-sqlite';
import LoadingIcon from '@/components/Loading';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { requestLisDataTasks, setRequestDataTasks } from '@/states/data';
import { dataSelectIncome, dataSelectSpent } from '@/data/select';
import { showToast } from '@/libs/ToastNotify/ToastManager';
import { formattedDate } from '@/utils/date';

const db = SQLite.openDatabaseSync('mydatabase');

export default function Form({ type }: {
    type: string,
}) {

    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: String(new Date()) || '',
        note: '',
        money: 0,
        category: '',
        spent: type === 'Spent' ? 1 : 0
    });
    const dispatch = useDispatch();
    const theme = useColorScheme() ?? 'light';
    const requestTable = useSelector(requestLisDataTasks);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setFormData({
            ...formData,
            date: String(currentDate)
        })
    };

    const showMode = (currentMode: any) => {

        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });

    };

    const conditionType = () => {
        if (type === 'Spent') return 1
        if (type === 'Income') return 0
        return 1
    }


    const onSubmit = async () => {

        if (formData.money == 0) {
            // Alert.alert("Please enter the money you spent");
            showToast({
                type: 'warning',
                title: 'Create a task pending',
                description: 'Please enter the money you spent'
            })
            return;
        }
        if (formData.note.length == 0) {
            // Alert.alert("Please enter the note");
            showToast({
                type: 'warning',
                title: 'Create a task pending',
                description: 'Please enter the note'
            })
            return;
        }
        try {
            setIsLoading(true);
            await db.withExclusiveTransactionAsync(async (tx) => {
                await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS dataTask (
        id INTEGER PRIMARY KEY NOT NULL, 
        date TEXT NOT NULL, 
        note TEXT NOT NULL, 
        money INTEGER, 
        category TEXT NOT NULL,
        spent INTEGER
      );
    `);
                const statement = await tx.prepareAsync(`INSERT INTO dataTask
    (date, note, money, category,spent)
    VALUES (?, ?, ?, ?, ?);`);
                await statement.executeAsync(String(formData.date), formData.note, formData.money, formData.category, conditionType()).finally(() => {
                    setIsLoading(false);
                    dispatch(setRequestDataTasks({
                        ...requestTable,
                        ...formData,
                        spent: conditionType()
                    } as any))

                });

            });
            showToast({
                type: 'success',
                title: 'Create an item success',
                description: ''
            })

        } catch (error: any) {
            showToast({
                type: 'error',
                title: 'Create a task fail',
                description: ''
            })
        }
    }


    return (
        <>
            <ThemedView style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20,
                alignItems: 'center'
            }}>
                <ThemedText style={styles.textLabel}>Date</ThemedText>

                {Platform.OS === 'android' && (

                    <TouchableOpacity onPress={showMode}
                        style={
                            {
                                backgroundColor: ThemeColors.greenLight,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 12,
                            }
                        }
                    >

                        <ThemedText style={{
                            fontSize: 18,
                            textAlign: 'center'
                        }}>{formattedDate(date)}</ThemedText>
                    </TouchableOpacity>
                )}

                {Platform.OS === 'ios' && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                        style={{
                            width: 'auto',
                        }}
                    />
                )}

            </ThemedView>
            <ThemedView style={[styles.containerFlex, {
                paddingVertical: 0
            }]}>
                <ThemedText style={styles.textLabel}>Note</ThemedText>
                <TextInput placeholder="Haven't enter" style={{
                    flex: 1,
                    paddingVertical: 20,
                    color: theme == 'dark' ? '#fff' : '#000'
                }}

                    onChangeText={(value: any) => {
                        setFormData({
                            ...formData,
                            note: value
                        })
                    }}
                />
            </ThemedView>
            <ThemedView style={styles.containerFlex}>
                <ThemedText style={styles.textLabel}>
                    {type == "Spent" ? 'Money' : 'Income'}
                </ThemedText>
                <TextInput style={[styles.input, {
                    backgroundColor: ThemeColors.greenLight,
                    borderRadius: 10,
                    color: '#000',

                }]} keyboardType='numeric' defaultValue='0'

                    onChangeText={(val: any) => {
                        setFormData({
                            ...formData,
                            money: val
                        })
                    }}
                />
                <ThemedText>$</ThemedText>

            </ThemedView>
            <ThemedView>
                <ThemedText style={styles.textLabel}>Category</ThemedText>
                <ThemedView style={{
                    marginTop: 20
                }}>

                    {type === 'Spent' && (
                        <SelectList
                            setSelected={(val: any) => setFormData({
                                ...formData,
                                category: val
                            })}
                            data={dataSelectSpent}
                            defaultOption={dataSelectSpent[0]}
                            inputStyles={{
                                color: theme == 'dark' ? 'grey' : ''
                            }}
                            boxStyles={{
                                backgroundColor: theme == 'dark' ? '#fff' : ''
                            }}
                            dropdownStyles={{
                                backgroundColor: theme == 'dark' ? '#fff' : ''
                            }}
                        />

                    )}
                    {type === 'Income' && (
                        <SelectList
                            setSelected={(val: any) => setFormData({
                                ...formData,
                                category: val
                            })}
                            data={dataSelectIncome}
                            defaultOption={dataSelectIncome[0]}
                            inputStyles={{
                                color: theme == 'dark' ? 'grey' : ''
                            }}
                            boxStyles={{
                                backgroundColor: theme == 'dark' ? '#fff' : ''
                            }}
                            dropdownStyles={{
                                backgroundColor: theme == 'dark' ? '#fff' : ''
                            }}
                        />

                    )}
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonEnter}
                    onPress={onSubmit}
                >
                    {isLoading && <LoadingIcon />}
                    <ThemedText style={styles.textButtonEnter}>Enter</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </>
    );
}
