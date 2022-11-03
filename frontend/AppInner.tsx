import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chats from './src/pages/Chats';
import Community from './src/pages/Community';
import Main from './src/pages/Main';
import Mypage from './src/pages/Mypage';
import Spots from './src/pages/Spots';

import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import {MAIN_COLOR} from '~/const';

// import {RootState} from "./src/store/reducer";

export type LoggedInParamList = {
  Chats: undefined;
  Spots: undefined;
  Main: undefined;
  Community: undefined;
  Mypage: undefined;
  // Coummunity: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  // const isLoggedIn = useSelector(( state:RootState) => !!state.user.email)
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="홈">
          <Tab.Screen
            name="채팅"
            component={Chats}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="애견 동반 스팟"
            component={Spots}
            options={{optiopn: false}}
          />
          <Tab.Screen
            name="홈"
            component={Main}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
            }}
          />
          <Tab.Screen
            name="커뮤니티"
            component={Community}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
            }}
          />
          <Tab.Screen
            name="마이페이지"
            component={Mypage}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default AppInner;