import { useState } from "react";
import { PixelRatio, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AddCaloriesButton from "./AddCaloriesButton";
import AddCaloriesModal from "./AddCaloriesModal";
import AddedCalories from "./AddedCalories";
import SetLimitModal from "./SetLimitModal";

export default function Calories({setData, addedKey, added, setAdded, limitKey, limit, setLimit}) {
    const [visibleLimit, setVisibleLimit] = useState(false);
    const [visibleAddCalories, setVisibleAddCalories] = useState(false);
    const [type, setType] =  useState(null);
    const [items, setItems] = useState([
      {label: 'Consumed', value: 'Consumed'},
      {label: 'Burned', value: 'Burned'}
    ]);

    const renderCalories = (added, setAdded, type, addedKey, setData) => {
        return (
            <>
                {added.map((element, index) => element[0] === type ? <AddedCalories key={index} index={index} title={element[1]} calories={element[2]} added={added} setAdded={setAdded} addedKey={addedKey} setData={setData} /> : null)}
            </>
        );
    }

    return (
        <>
            <GestureHandlerRootView style={styles.calories}>
                <AddCaloriesButton add={false} title='Set Limit' onOpen={() => setVisibleLimit()} />
                <AddCaloriesButton add={true} title='Consumed' onOpen={() => {setVisibleAddCalories(true), setType('Consumed')}} />
                {renderCalories(added, setAdded, 'Consumed', addedKey=addedKey, setData=setData)}
                <AddCaloriesButton add={true} title='Burned' onOpen={() => {setVisibleAddCalories(true), setType('Burned')}} />
                {renderCalories(added, setAdded, 'Burned', addedKey=addedKey, setData=setData)}
            </GestureHandlerRootView>

            <AddCaloriesModal
                visible={visibleAddCalories}
                type={type}
                setType={setType}
                items={items}
                setItems={setItems}
                close={() => setVisibleAddCalories(false)}
                added={added}
                setAdded={setAdded}
                addedKey={addedKey}
                setData={setData}
            />

            <SetLimitModal
                visible={visibleLimit}
                close={() => setVisibleLimit(false)}
                limit={limit}
                setLimit={setLimit}
                limitKey={limitKey}
                setData={setData}
            />
        </>
    );
}

const styles = StyleSheet.create({
    calories: {
        alignItems: 'center',
        paddingBottom: 10 * PixelRatio.getFontScale(),
    },
    bigWrap: {
        backgroundColor: 'yellow',
        width: '98%',
    },
});
