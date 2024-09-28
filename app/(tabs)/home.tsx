import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, Image, RefreshControl, Text, View} from "react-native";

import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import {images} from "@/constants";
import {getAllPosts, getLatestPosts} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/video-card";

const Home = () => {
    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestPosts } = useAppwrite(getLatestPosts);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className={"bg-primary h-full"}>
            <FlatList
                data={posts}
                keyExtractor={((item) => item.$id)}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator.username}
                        avatar={item.creator.avatar}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className={"my-6 px-4 space-y-6"}>
                        <View className={"justify-between items-start flex-row mb-6"}>
                            <View>
                                <Text className={"font-pmedium text-sm text-gray-100"}>Welcome Back</Text>
                                <Text className={"text-2xl font-psemibold text-white"}>Aora App</Text>
                            </View>

                            <View className={"mt-1.5"}>
                                <Image
                                    source={images.logoSmall}
                                    className={"w-9 h-10"}
                                    resizeMode={"contain"}
                                />
                            </View>
                        </View>

                        <SearchInput/>

                        <View className={"w-full flex-1 pt-5 pb-8"}>
                            <Text className={"text-gray-100 text-lg font-pregular mb-3"}>Last Videos</Text>
                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title={
                        "No videos found"
                    } subtitle={
                        "No videos created yet, please check back later"
                    }/>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}

export default Home;