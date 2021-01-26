import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { IconButton, Text, Title } from 'react-native-paper';
import { getExhibitionById } from '../api/exhibitions';
import ModalBody from '../components/ModalBody';
import { ScrollView } from 'react-native-gesture-handler';
import { map, size } from 'lodash';

const InfoCard = ({ route }) => {
  const { _id } = route.params;
  const [visible, setVisible] = useState(false);
  const [exhibition, setExhibition] = useState(null);

  const showModal = () => setVisible(!visible);

  useEffect(() => {
    getExhibitionById(_id).then((response) => {
      setExhibition(response);
    });
  }, []);

  if (!exhibition) return null;

  const [imageURL] = exhibition.images;
  const [logoURL] = exhibition.sponsorLogo;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoImage path={imageURL} />
        <InfoModal setVisible={setVisible} />
        <InfoTitle exhibition={exhibition} />
        <Text style={styles.overview}>{exhibition.description}</Text>
        {logoURL && <InfoSponsor url={logoURL} />}
        <InfoFooter exhibition={exhibition} />
      </ScrollView>
      <ModalBody visible={visible} showModal={showModal} />
    </SafeAreaView>
  );
};

export default InfoCard;

const InfoImage = ({ path }) => {
  return (
    <View style={styles.viewPoster}>
      <Image style={styles.poster} source={{ uri: path }} />
    </View>
  );
};

const InfoModal = ({ setVisible }) => {
  return (
    <View style={styles.viewModal}>
      <IconButton
        icon="information-variant"
        size={30}
        color="#000"
        style={styles.info}
        onPress={() => setVisible(true)}
      />
    </View>
  );
};

const InfoTitle = ({ exhibition }) => {
  return (
    <View style={styles.viewInfo}>
      <Title style={{ color: '#F29F05', fontWeight: 'bold', fontSize: 23 }}>
        {exhibition.name}
      </Title>
    </View>
  );
};

const InfoSponsor = ({ url }) => {
  return (
    <View style={styles.viewSponsor}>
      <Title style={{ color: 'black', fontSize: 17, fontWeight: 'bold', marginHorizontal: 30, marginTop: 5 }}>Patrocina: </Title>
      <Image source={{ uri: url }} style={styles.imgSponsor} />
    </View>
  );
};

const InfoFooter = ({ exhibition }) => {
  const {
    minimumAge,
    maximumAge,
    educationArea,
    duration,
    capacity,
  } = exhibition;
  return (
    <View style={styles.viewFooter}>
      <FooterItem
        title="Educación:"
        desc={educationArea}
        icon="book-open-variant"
      />
      <FooterItem
        title="Edades:"
        desc={`${minimumAge} a ${maximumAge} años`}
        icon="human-male-boy"
      />
      <FooterItem
        title="Duración:"
        desc={duration == 1 ? `${duration} minuto` : `${duration} minutos`}
        icon="clock-time-three-outline"
      />
      <FooterItem
        title="Capacidad:"
        desc={capacity == 1 ? `${capacity} niño` : `${capacity} niños`}
        icon="account-group"
      />
    </View>
  );
};

const FooterItem = ({ title, desc, icon }) => {
  return (
    <View>
      <IconButton
        icon={icon}
        size={30}
        color="#F87311"
        style={styles.footerItem}
      />
      <Text style={[styles.textItem, { fontWeight: 'bold' }]}>{title}</Text>
      {Array.isArray(desc) ? (
        map(desc, (d, index) => (
          <Text key={index} style={styles.textItem}>
            {d}
            {index !== size(desc) - 1 && ', '}
          </Text>
        ))
      ) : (
        <Text style={styles.textItem}>{desc}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  info: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 0.15,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewModal: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  viewFooter: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#F87311',
    borderWidth: 2,
  },
  textItem: {
    fontFamily: 'NunitoSans-Bold',
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
  overview: {
    fontFamily: 'NunitoSans-Bold',
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#929292',
    fontSize: 16,
  },
  imgSponsor: {
    width: 160,
    height: 100,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
});
