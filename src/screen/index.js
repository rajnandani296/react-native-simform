// import libraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {fetchChemicalRecord} from '../action';
import {Images} from '../constants/Images';
import {BLUE, GRAY} from '../constants/Color';
import {useSelector, useDispatch} from 'react-redux';
import {Strings} from '../constants/Strings';

// create a component
const MyComponent = () => {
  const [chemicalData, setChemical] = useState([]);
  const dispatch = useDispatch();
  const response = useSelector(state => state.fetchChemicalReducer);

  useEffect(() => {
    if (response.data.length == 0) dispatch(fetchChemicalRecord());
  }, []);

  useEffect(() => {
    if (response && response.data && response.data.data) {
      response.data.data.map((item, parentIndex) => {
        response.data.data[parentIndex].selectedColor = item.values[0].color;
      });
      setChemical([...response.data.data]);
    }
  }, [response]);

  const onColorSelection = (headerIndex, selectedValue, selectedColor) => {
    chemicalData[headerIndex].selectedValue = selectedValue;
    chemicalData[headerIndex].selectedColor = selectedColor;
    chemicalData &&
      chemicalData[headerIndex].values.map((item, index) => {
        if (item.value == selectedValue) {
          item.active = true;
        } else {
          item.active = false;
        }
      });

    setChemical([...chemicalData]);
  };
  const showAllSelectedValue = () => {
    var selectedValue = chemicalData.map(function (val) {
      return val.selectedValue;
    });
    console.log('===', selectedValue);
    let items = selectedValue.filter(el => {
      return el != null;
    });
    if (items && items.length) {
      alert(items);
    } else {
      alert('Please select item');
    }
  };
  const renderHeaderView = () => {
    return (
      <View style={styles.headerView}>
        <View style={styles.headerInnerView}>
          <Image style={styles.backIcon} source={Images.arrow}></Image>

          <TouchableOpacity
            onPress={() => {
              showAllSelectedValue();
            }}>
            <Text style={styles.nextText}>{Strings.next}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>{Strings.testStrip}</Text>
      </View>
    );
  };
  const renderTitleItem = (
    headerIndex,
    name,
    unit,
    selectedValue,
    valueArray,
  ) => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {name}
          <Text style={styles.unitText}>{' (' + unit + ')'}</Text>
        </Text>
        <TextInput
          placeholder={'0'}
          keyboardType="numeric"
          style={styles.textInput}
          value={selectedValue}
          onChangeText={value => {
            validation(headerIndex, value, valueArray);
          }}
        />
      </View>
    );
  };
  const validation = (headerIndex, enteredValue, valueArray) => {
    var sortedValue = valueArray.map(function (val) {
      return val.value;
    });
    const output = sortedValue.reduce((prev, curr) =>
      Math.abs(curr - enteredValue) < Math.abs(prev - enteredValue)
        ? curr
        : prev,
    );
    chemicalData[headerIndex].selectedValue = enteredValue;
    chemicalData &&
      chemicalData[headerIndex].values.map((item, index) => {
        if (item.value == output) {
          item.active = true;
          chemicalData[headerIndex].selectedColor = item.color;
        } else {
          item.active = false;
        }
      });

    setChemical([...chemicalData]);
    console.log('Test', output);
  };
  const renderColorCell = (headerIndex, value) => {
    return (
      <View style={styles.colorStripView}>
        <TouchableOpacity
          style={[styles.colorTouchView, {borderWidth: value.active ? 2 : 0}]}
          onPress={() => {
            onColorSelection(headerIndex, value.value, value.color);
          }}>
          <View
            style={[
              styles.colorBoxView,
              {
                backgroundColor: value.color,
                width:
                  Platform.OS == 'ios'
                    ? Dimensions.get('window').width / 8
                    : Dimensions.get('window').width / 7,
              },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.testValue}>{value.value}</Text>
      </View>
    );
  };

  const renderSideStrip = (headerIndex, selectedColor) => {
    return (
      <View
        style={[
          styles.sideStrip,
          {
            borderTopWidth: headerIndex == 0 ? 1 : 0,
            borderBottomWidth: headerIndex == chemicalData.length - 1 ? 1 : 0,
          },
        ]}>
        <View
          style={[styles.selectedColorStrip, {backgroundColor: selectedColor}]}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderHeaderView()}

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{paddingBottom: 50}}>
        {chemicalData
          ? chemicalData.map((value, headerIndex) => {
              return (
                <View key={headerIndex}>
                  {renderTitleItem(
                    headerIndex,
                    value.name,
                    value.unit,
                    value.selectedValue,
                    value.values,
                  )}
                  {renderSideStrip(headerIndex, value.selectedColor)}
                  <ScrollView style={styles.colorStripScroll} horizontal>
                    {value.values.map((value, childIndex) => {
                      return renderColorCell(headerIndex, value);
                    })}
                  </ScrollView>
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    marginTop: 20,
    fontWeight: 'bold',
    color: BLUE,
  },
  headerView: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  headerInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  nextText: {
    color: 'white',
    width: 60,
    padding: 5,
    borderRadius: 30 / 2,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: GRAY,
  },
  scrollContainer: {
    flex: 1,
  },
  titleContainer: {
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    marginTop: 30,
    marginStart: 60,
    fontSize: 15,
    color: GRAY,
    fontWeight: 'bold',
  },
  unitText: {
    marginTop: 30,
    marginStart: 60,
    fontSize: 15,
    color: GRAY,
    fontWeight: '100',
  },
  textInput: {
    marginTop: 20,
    width: 70,
    textAlign: 'center',
    borderColor: GRAY,
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
  },
  sideStrip: {
    marginStart: 5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    //borderRadius: 5,
    position: 'absolute',
    alignItems: 'center',
    height: 150,
    overflow: 'hidden',
    borderColor: GRAY,
    width: 30,
  },
  selectedColorStrip: {
    marginTop: 65,
    position: 'absolute',
    height: 30,
    width: 30,
  },
  colorStripScroll: {
    marginStart: 50,
  },
  colorStripView: {
    alignItems: 'center',
  },
  colorTouchView: {
    margin: 5,
    borderRadius: 8,
    padding: 1,
    borderColor: '#87BE17',
    overflow: 'hidden',
  },
  colorBoxView: {
    borderRadius: 8,
    padding: 15,
    height: 20,
  },
  testValue: {
    color: GRAY,
  },
});

// make this component available to the app
export default MyComponent;
