/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import { TouchableOpacity, FlatList , View, Text, SafeAreaView, Alert} from 'react-native';

const uniqueCardsArray = [
	{
	  name: "A",
	  index : 1,
	  isFlip : false,
	  isComplete : false
	},
	{
		name: "A",
		index : 2,
		isFlip : false,
		isComplete : false
	},
	{
		name: "B",
		index : 3,
		isFlip : false,
		isComplete : false
	},
	{
		name: "B",
		index : 4,
		isFlip : false,
		isComplete : false
	},
	{
		name: "C",
		index : 5,
		isFlip : false,
		isComplete : false
	},
	{
		name: "C",
		index : 6,
		isFlip : false,
		isComplete : false
	},
	{
		name: "D",
		index : 7,
		isFlip : false,
		isComplete : false
	},
	{
		name: "D",
		index : 8,
		isFlip : false,
		isComplete : false
	},
	{
		name: "E",
		index : 9,
		isFlip : false,
		isComplete : false
	},
	{
		name: "E",
		index : 10,
		isFlip : false,
		isComplete : false
	},
	{
		name: "F",
		index : 11,
		isFlip : false,
		isComplete : false
	},
	{
		name: "F",
		index : 12,
		isFlip : false,
		isComplete : false
	},
	{
		name: "G",
		index : 13,
		isFlip : false,
		isComplete : false
	},
	{
		name: "G",
		index : 14,
		isFlip : false,
		isComplete : false
	},
	{
		name: "H",
		index : 15,
		isFlip : false,
		isComplete : false
	},
	{
		name: "H",
		index : 16,
		isFlip : false,
		isComplete : false
	},	
]

const App = () => {
 
	const [Cards , setCards] = useState([])
	const [tryCount, setTryCount ] = useState(0)
	const [matchCount, setMatchCount ] = useState(0)
	const [selectedCard, setSelectedCard ] = useState(null)


	useEffect(() => {
		
		RandomData()
		
	}, [])


	// Refresh Data & Create New Random Array
	const RandomData = () => {
		
		var data = uniqueCardsArray.sort(() => Math.random() - 0.5)

		setTryCount(0)
		setMatchCount(0)
		setSelectedCard(null)
		setCards(data)
		
	}

	const handleClick = (item) => {

		// Check if any card is selected or not
		if(selectedCard == null)
		{
			setSelectedCard(item)

            var data = item
            let newStatus = Cards.map(el => (
                el.index === data.index ? { ...el, isFlip: true } : el
            ))

            setCards(newStatus)

		}else{

			// Check if card is already fliped or not
			if(!item.isFlip){

				// Check selected
				if(item.name == selectedCard.name){

					var data = item
					let newStatus = Cards.map(el => (
						el.index === data.index  ? { ...el, isFlip: true, isComplete : true } : el 
					))
	
					let finalData = newStatus.map(el => (
						el.index === selectedCard.index ? { ...el, isFlip: true, isComplete : true } : el
					))
					setCards(finalData)
	
					setTryCount(tryCount+1)
					setMatchCount(matchCount+1)
					setSelectedCard(null)

					let getChecked = finalData.filter((data) => data.isComplete == false)

					// Check all card is matched or not
					if(getChecked.length == 0){
						Alert.alert(  
							'Game Over',  
							'Your Score is '+(tryCount+1),  
							[  
								{text: 'Play Again', onPress: () => RandomData()},  
							]  
						); 
					}

				}else{
	
					setTryCount(tryCount+1)
	
					var data = item
					let newStatus = Cards.map(el => (
						el.index === data.index ? { ...el, isFlip: true } : el
					))
					setCards(newStatus)
	
					setTimeout(() => {
						let newStatus = Cards.map(el => {
							return { ...el, isFlip: el.isComplete ? true : false };
						})
						setCards(newStatus)
						setSelectedCard(null)
					}, 500);
	
				}
			}else{
				
			}

		}

	}

  return (
    <SafeAreaView style={{flex : 1}}>
      
	  <View style={{flex: 1}}>

		<View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 20}}>

			<Text style={{fontWeight : '600'}}>
				Turns : {tryCount}
			</Text>

			<Text style={{fontWeight : '600'}}>
				Matches : {matchCount} / 8
			</Text>
		</View>

		<FlatList style={{marginTop : 50}}
			data={Cards}
			extraData={selectedCard}
			numColumns={4}
			renderItem={({item, index}) => {
				return(
					<TouchableOpacity style={{backgroundColor : item.isComplete ? 'blue' : item.isFlip == true ? 'blue' : 'pink' , alignItems : 'center', justifyContent : 'center', flex : 0.25,
						borderColor : 'green', borderWidth : 2, padding : 20,
						}}
						onPress={() => handleClick(item)}>
						<Text style={{fontSize : 20, color : 'pink', fontWeight : '600'}}>
							{item.name}
						</Text>
				</TouchableOpacity>
				)}}/>

	  </View>

	  <TouchableOpacity style={{width : '50%', backgroundColor : 'blue', alignSelf : 'center', alignItems : 'center', justifyContent : 'center',
			padding : 20, borderRadius : 20}}
			onPress={() => RandomData()}>
		  <Text style={{color : 'white', fontSize : 20}}>
				Restart
		  </Text>
	  </TouchableOpacity>
    </SafeAreaView>
  );
};


export default App;
