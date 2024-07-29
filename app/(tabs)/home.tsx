import { FlatList, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { RefreshControl } from 'react-native'
import useAppWrite from '@/lib/useAppWrite'
import { getAllPosts, getLastestPost } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
interface User {
    id: string;
    avatar: string;
    username: string;
    $id: string; // Add the $id property
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    setUser: (user: any) => void;
    isLoading: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}
const Home = () => {

    const { data: posts, refetch } = useAppWrite(getAllPosts)
    const { data: latestPost } = useAppWrite(getLastestPost)
    const { user, setUser, setIsLoggedIn } = useGlobalContext() as GlobalContextType;
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        // re call videos ->  if any new videos appeard
        setRefreshing(false);
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome back
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    {user?.username}
                                </Text>
                            </View>
                            <View className='mt-1.5'>
                                <Image
                                    source={images.logoSmall}
                                    className='w-9 h-10'
                                    resizeMode='contain'
                                />
                            </View>
                        </View>
                        <SearchInput />

                        <View className='w-full flex-1 pt-5 pb-8'>
                            <Text className='text-gray-100 text-lg font-pregular mb-3'>
                                Latest Videos
                            </Text>
                            <Trending posts={latestPost ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subTitle="Be the first one to upload a video"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Home