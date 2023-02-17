import {ImageBackground, SafeAreaView} from 'react-native';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import Colors from "../../constants/colors";

function AddExpenseModal({children, title, onSubmit, visible, setVisible}) {
    return (
        <View style={styles.rootContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setVisible(false);
                }}>
                <SafeAreaView style={styles.rootContainer}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ImageBackground source={require('../../assets/images/background.png')}
                                             resizeMode="cover"
                                             style={styles.imageStyle}
                                             imageStyle={styles.backgroundImage}
                            >

                                <View style={styles.textHeaderContainer}>
                                    <Text style={styles.modalText}>{title}</Text>
                                </View>
                                {children}
                                <View style={styles.buttonContainer}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setVisible(false)}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={onSubmit}>
                                        <Text style={styles.textStyle}>Save</Text>
                                    </Pressable>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

export default AddExpenseModal;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    centeredView: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
    },
    modalView: {
        flex: 1,
        backgroundColor: Colors.modelBackground,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textHeaderContainer: {
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.modalHeader,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        margin: 4,
        width: 75,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.modalText,
    },
    imageStyle: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    backgroundImage: {
        opacity: 0.5,
        borderRadius: 20,
        overflow: 'hidden',
    },
});