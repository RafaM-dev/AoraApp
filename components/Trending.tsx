import { useState } from "react";
import { AVPlaybackStatus, AVPlaybackStatusError, ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    ViewToken,
} from "react-native";

import { icons } from "../constants";

// Definir interfaces para los tipos de datos
interface Item {
    $id: string;
    video: string;
    thumbnail: string;
}

interface Post {
    $id: string;
}

interface TrendingItemProps {
    activeItem: string;
    item: Item;
}

interface TrendingProps {
    posts: Post[];
}

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

const TrendingItem = ({ activeItem, item }: { activeItem: any, item: any }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut as any}
            duration={500}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus & { didJustFinish?: boolean } | AVPlaybackStatusError) => {
                        if ('didJustFinish' in status && status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="relative flex justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{
                            uri: item.thumbnail,
                        }}
                        className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode="cover"
                    />

                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }: { posts: any[] }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170, y: 0 }}
        />
    );
};

export default Trending;