import {View, Text, Image} from "react-native";
import {Redirect, Tabs} from "expo-router";
import {StatusBar} from "expo-status-bar";

import {useGlobalContext} from "@/context/global-provider";
import {icons} from "@/constants";
import Loader from "@/components/loader";

interface TabProps {
    focused: boolean;
    color: string;
    name: string;
    icon: any;
}

const TabIcon = ({focused, color, name, icon}: TabProps) => {
    return (
        <View className={"justify-center items-center gap-2"}>
            <Image
                source={icon}
                tintColor={color}
                resizeMode="contain"
                className={`w-6 h-6`}
            />
            <Text
                className={
                `${focused ? "font-psemibold" : "font-pregular"}`
            }
                style={{color}}
            >
                {name}
            </Text>
        </View>
    );
}

const TabsLayout = () => {
    const { loading, isLogged } = useGlobalContext();

    if (!loading && !isLogged) return <Redirect href="/sign-in" />;
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 84,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                focused={focused}
                                color={color}
                                icon={icons.home}
                                name={"Home"}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: "Bookmark",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                focused={focused}
                                color={color}
                                icon={icons.bookmark}
                                name={"Bookmark"}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                focused={focused}
                                color={color}
                                icon={icons.plus}
                                name={"Create"}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                focused={focused}
                                color={color}
                                icon={icons.profile}
                                name={"Profile"}
                            />
                        )
                    }}
                />
            </Tabs>

            <Loader isLoading={loading} />
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
}

export default TabsLayout;