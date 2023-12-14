import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import GalleryPost from '../../components/GalleryPost/GalleryPost'
import { LinearGradient } from 'expo-linear-gradient'

type TPostProps = {
  imageId: number
  image: string
  userId: number
  userName: string
  location: string
}

const DATA: TPostProps[] = [
  {
    imageId: 1,
    userId: 1,
    userName: "John Doe",
    image: "https://g4.img-dpreview.com/E1B05DB942FF4CB4B6A84AC45DE108A0.jpg",
    location: "New York, NY"
  },
  {
    imageId: 2,
    userId: 2,
    userName: "Jane Doe",
    image: "https://g1.img-dpreview.com/8ABA6362533940E683F5870B45905762.jpg",
    location: "Los Angeles, CA"
  },
  {
    imageId: 3,
    userId: 3,
    userName: "John Smith",
    image: "https://g3.img-dpreview.com/44AB7E8F3C4B4778B3624E06E8C47450.jpg",
    location: "Chicago, IL"
  },
  {
    imageId: 4,
    userId: 4,
    userName: "Jane Smith",
    image: "https://g4.img-dpreview.com/B63E836C0BFA47E9AB751BA39D49F0EA.jpg",
    location: "Houston, TX"
  },
  {
    imageId: 5,
    userId: 5,
    userName: "Dave Doe",
    image: "https://g1.img-dpreview.com/F62B5EA839EE42538959BE69258B74FA.jpg",
    location: "Philadelphia, PA"
  },
  {
    imageId: 6,
    userId: 6,
    userName: "Mary Smith",
    image: "https://g2.img-dpreview.com/30EA1272B36E47059534E9BD6C9002CC.jpg",
    location: "Phoenix, AZ"
  },
  {
    imageId: 7,
    userId: 1,
    userName: "John Doe",
    image: "https://g3.img-dpreview.com/0203B84230E64BF2AEBC277C7B085930.jpg",
    location: "San Antonio, TX"
  },
  {
    imageId: 8,
    userId: 2,
    userName: "Jane Doe",
    image: "https://g1.img-dpreview.com/8ABA6362533940E683F5870B45905762.jpg",
    location: "San Diego, CA"
  },
  {
    imageId: 9,
    userId: 3,
    userName: "John Smith",
    image: "https://g3.img-dpreview.com/44AB7E8F3C4B4778B3624E06E8C47450.jpg",
    location: "Dallas, TX"
  },
  {
    imageId: 10,
    userId: 4,
    userName: "Jane Smith",
    image: "https://g4.img-dpreview.com/B63E836C0BFA47E9AB751BA39D49F0EA.jpg",
    location: "San Jose, CA"
  },
  {
    imageId: 1,
    userId: 1,
    userName: "John Doe",
    image: "https://g4.img-dpreview.com/E1B05DB942FF4CB4B6A84AC45DE108A0.jpg",
    location: "New York, NY"
  },
  {
    imageId: 2,
    userId: 2,
    userName: "Jane Doe",
    image: "https://g1.img-dpreview.com/8ABA6362533940E683F5870B45905762.jpg",
    location: "Los Angeles, CA"
  },
  {
    imageId: 3,
    userId: 3,
    userName: "John Smith",
    image: "https://g3.img-dpreview.com/44AB7E8F3C4B4778B3624E06E8C47450.jpg",
    location: "Chicago, IL"
  },
  {
    imageId: 4,
    userId: 4,
    userName: "Jane Smith",
    image: "https://g4.img-dpreview.com/B63E836C0BFA47E9AB751BA39D49F0EA.jpg",
    location: "Houston, TX"
  },
  {
    imageId: 5,
    userId: 5,
    userName: "Dave Doe",
    image: "https://g1.img-dpreview.com/F62B5EA839EE42538959BE69258B74FA.jpg",
    location: "Philadelphia, PA"
  },
  {
    imageId: 6,
    userId: 6,
    userName: "Mary Smith",
    image: "https://g2.img-dpreview.com/30EA1272B36E47059534E9BD6C9002CC.jpg",
    location: "Phoenix, AZ"
  },
  {
    imageId: 7,
    userId: 1,
    userName: "John Doe",
    image: "https://g3.img-dpreview.com/0203B84230E64BF2AEBC277C7B085930.jpg",
    location: "San Antonio, TX"
  },
  {
    imageId: 8,
    userId: 2,
    userName: "Jane Doe",
    image: "https://g1.img-dpreview.com/8ABA6362533940E683F5870B45905762.jpg",
    location: "San Diego, CA"
  },
  {
    imageId: 9,
    userId: 3,
    userName: "John Smith",
    image: "https://g3.img-dpreview.com/44AB7E8F3C4B4778B3624E06E8C47450.jpg",
    location: "Dallas, TX"
  },
  {
    imageId: 10,
    userId: 4,
    userName: "Jane Smith",
    image: "https://g4.img-dpreview.com/B63E836C0BFA47E9AB751BA39D49F0EA.jpg",
    location: "San Jose, CA"
  },
  {
    imageId: 1,
    userId: 1,
    userName: "John Doe",
    image: "https://g4.img-dpreview.com/E1B05DB942FF4CB4B6A84AC45DE108A0.jpg",
    location: "New York, NY"
  },
  {
    imageId: 2,
    userId: 2,
    userName: "Jane Doe",
    image: "https://g1.img-dpreview.com/8ABA6362533940E683F5870B45905762.jpg",
    location: "Los Angeles, CA"
  },
  {
    imageId: 3,
    userId: 3,
    userName: "John Smith",
    image: "https://g3.img-dpreview.com/44AB7E8F3C4B4778B3624E06E8C47450.jpg",
    location: "Chicago, IL"
  },
  {
    imageId: 4,
    userId: 4,
    userName: "Jane Smith",
    image: "https://g4.img-dpreview.com/B63E836C0BFA47E9AB751BA39D49F0EA.jpg",
    location: "Houston, TX"
  },
  {
    imageId: 5,
    userId: 5,
    userName: "Dave Doe",
    image: "https://g1.img-dpreview.com/F62B5EA839EE42538959BE69258B74FA.jpg",
    location: "Philadelphia, PA"
  },
  {
    imageId: 6,
    userId: 6,
    userName: "Mary Smith",
    image: "https://g2.img-dpreview.com/30EA1272B36E47059534E9BD6C9002CC.jpg",
    location: "Phoenix, AZ"
  },
  {
    imageId: 7,
    userId: 1,
    userName: "John Doe",
    image: "https://g3.img-dpreview.com/0203B84230E64BF2AEBC277C7B085930.jpg",
    location: "San Antonio, TX"
  },
  {
    imageId: 8,
    userId: 2,
    userName: "Jane Doe",
    image: "https://g1.img-dpreview.com/8ABA6362533940E683F5870B45905762.jpg",
    location: "San Diego, CA"
  },
  {
    imageId: 9,
    userId: 3,
    userName: "John Smith",
    image: "https://g3.img-dpreview.com/44AB7E8F3C4B4778B3624E06E8C47450.jpg",
    location: "Dallas, TX"
  },
  {
    imageId: 10,
    userId: 4,
    userName: "Jane Smith",
    image: "https://g4.img-dpreview.com/B63E836C0BFA47E9AB751BA39D49F0EA.jpg",
    location: "San Jose, CA"
  }
]

const ExplorePage = () => {
  return (
    <LinearGradient 
      // className='flex-1 flex-row bg-white'
      style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}
      colors={['#ffc0a066', '#ffe7a066']}
    >
      <FlatList 
        numColumns={3}
        data={DATA}
        extraData={DATA}
        keyExtractor={(item) => item.imageId.toString()}
        refreshing={false}
        onRefresh={() => console.log("refreshing")}
        renderItem={({item}) => (
          // <GalleryPost 
          //   key={item.imageId}
          //   postID={item.imageId.toString()}
          //   username={item.userName}
          //   image={item.image}
          // />
          <Text>{item.userName}</Text>
        )}
      >
        {/* <GalleryPost 
          userId={POST[0].userId}
          userName={POST[0].userName}
          image={POST[0].image}
          location={POST[0].location}
        />
        <GalleryPost 
          userId={POST[1].userId}
          userName={POST[1].userName}
          image={POST[1].image}
          location={POST[1].location}
        />
        <GalleryPost 
          userId={POST[2].userId}
          userName={POST[2].userName}
          image={POST[2].image}
          location={POST[2].location}
        />
        <GalleryPost 
          userId={POST[3].userId}
          userName={POST[3].userName}
          image={POST[3].image}
          location={POST[3].location}
        />
        <GalleryPost 
          userId={POST[4].userId}
          userName={POST[4].userName}
          image={POST[4].image}
          location={POST[4].location}
        />
        <GalleryPost 
          userId={POST[5].userId}
          userName={POST[5].userName}
          image={POST[5].image}
          location={POST[5].location}
        />
        <GalleryPost 
          userId={POST[6].userId}
          userName={POST[6].userName}
          image={POST[6].image}
          location={POST[6].location}
        />
        <GalleryPost 
          userId={POST[0].userId}
          userName={POST[0].userName}
          image={POST[0].image}
          location={POST[0].location}
        />
        <GalleryPost 
          userId={POST[1].userId}
          userName={POST[1].userName}
          image={POST[1].image}
          location={POST[1].location}
        />
        <GalleryPost 
          userId={POST[2].userId}
          userName={POST[2].userName}
          image={POST[2].image}
          location={POST[2].location}
        />
        <GalleryPost 
          userId={POST[3].userId}
          userName={POST[3].userName}
          image={POST[3].image}
          location={POST[3].location}
        />
        <GalleryPost 
          userId={POST[4].userId}
          userName={POST[4].userName}
          image={POST[4].image}
          location={POST[4].location}
        />
        <GalleryPost 
          userId={POST[5].userId}
          userName={POST[5].userName}
          image={POST[5].image}
          location={POST[5].location}
        />
        <GalleryPost 
          userId={POST[6].userId}
          userName={POST[6].userName}
          image={POST[6].image}
          location={POST[6].location}
        />
        <GalleryPost 
          userId={POST[0].userId}
          userName={POST[0].userName}
          image={POST[0].image}
          location={POST[0].location}
        />
        <GalleryPost 
          userId={POST[1].userId}
          userName={POST[1].userName}
          image={POST[1].image}
          location={POST[1].location}
        />
        <GalleryPost 
          userId={POST[2].userId}
          userName={POST[2].userName}
          image={POST[2].image}
          location={POST[2].location}
        />
        <GalleryPost 
          userId={POST[3].userId}
          userName={POST[3].userName}
          image={POST[3].image}
          location={POST[3].location}
        />
        <GalleryPost 
          userId={POST[4].userId}
          userName={POST[4].userName}
          image={POST[4].image}
          location={POST[4].location}
        />
        <GalleryPost 
          userId={POST[5].userId}
          userName={POST[5].userName}
          image={POST[5].image}
          location={POST[5].location}
        />
        <GalleryPost 
          userId={POST[6].userId}
          userName={POST[6].userName}
          image={POST[6].image}
          location={POST[6].location}
        /> */}
        
      </FlatList>
    </LinearGradient>
  )
}

export default ExplorePage