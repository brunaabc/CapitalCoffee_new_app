import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { FavoritosContext } from '../context/FavoritosContext';

const cafes = [
  {
    id: '1',
    nome: 'Aloom',
    subtitulo: 'The Wow Lab',
    local: 'CLS 201 Bloco B Loja 37 - Asa Sul, Brasília - DF',
    descricao: 'Experimente o extraordinário! Mais do que uma gelateria, uma marca comprometida em criar experiências fora da curva. Proporcionamos momentos encantadores por meio de gelatos, cafés e outros produtos de qualidade excepcional, além de um universo autêntico que encanta pela inovação e conquista pela excelência.',
    horario: 'Segunda a Sexta • 11h às 20h | Sábados, Domingos e Feriados • 9h às 20h',
    imagem: require('../img/aloom2.webp'),
  },
  {
    id: '2',
    nome: 'Bimi',
    local: 'SCRLN 715 bloco D loja 43 - Asa Norte, Brasília - DF',
    descricao: 'Uma loja de doces, vinho natural, café, pizza romana e mais. O Bimi Café em Brasília é mais que uma cafeteria; é um espaço acolhedor na Asa Norte que oferece cafés especiais, opções veganas, comida variada e um ambiente ideal para trabalhar ou relaxar. Além disso, funciona como um centro cultural, sediando eventos e com uma livraria, tornando-se um ponto de encontro e referência na cidade.',
    horario: 'Terça a Sábado • 10h às 19h',
    imagem: require('../img/bimicafe.png'),
  },
  {
    id: '3',
    nome: 'Oliva Café',
    local: 'CLNW 10/11 Bloco A - Noroeste, loja 13, Brasília - DF',
    descricao: 'Boulangerie e Cafeteria com Vinhos. Localizado no bairro Noroeste, o Oliva Café apresenta um cardápio variado que combina opções tradicionais e contemporâneas.. Entre os destaques estão os pães artesanais, toasts e sanduíches, que oferecem combinações de sabores cuidadosamente elaboradas. O ambiente descontraído do café complementa a experiência gastronômica, permitindo que os visitantes desfrutem de opções frescas e feitas com ingredientes selecionados. Este cuidado é notável em todas as categorias do menu, incluindo as bebidas e sobremesas.',
    horario: 'Todos os dias • 8h às 20h',
    imagem: require('../img/olivacafe1.webp'),
  },
  {
    id: '4',
    nome: 'Acervo Café',
    local: 'SGCV Sul, Sgcv Lt 12/2, Brasília - DF',
    descricao: 'O Acervo Café no CasaPark é um espaço charmoso em Brasília que se destaca por oferecer cafés especiais com grãos selecionados e torrados pela própria casa. Além dos cafés, o local é conhecido por suas receitas "que afagam o coração", incluindo doces como o famoso Coffecake, um bolo de chocolate com café. Também oferece opções para o happy hour, como vinhos naturais, e lanches saborosos como o avocado toast. O ambiente do Acervo Café é inusitado, sensível e intimista, com um design que valoriza a arte, tornando-o ideal para um tempo de qualidade, seja sozinho ou acompanhado.',
    horario: 'Segunda a sábado • 10h às 22h | Domingo • 12h às 20h',
    imagem: require('../img/acervocafe.webp'),
  },
  {
    id: '5',
    nome: 'Ernesto',
    subtitulo:'Cafés Especiais',
    local: 'Asa Sul CLS 115 BL C - Asa Sul, Brasília - DF',
    descricao: 'É o primeiro nome que vem à cabeça de muita gente quando se fala a palavra “café” em Brasília. O Ernesto é a perfeita combinação de um ambiente bacana, comidinhas deliciosas — tem bolos irresistíveis e até uma famosa pamonha assada aos fins de semana — e café em diferentes blends e formas de extração. A vizinhança com a Urban Arts reforça o aspecto cool do lugar. Além de ser um verdadeiro ícone no cenário café de Brasília, o Ernesto Café conquista pela sua atmosfera acolhedora e descomplicada, onde cada detalhe reflete o carinho e a paixão pelo que faz. Seja para um café rápido no intervalo do dia ou para um encontro mais descontraído com amigos, o ambiente é perfeito para se perder entre conversas e risadas. O aroma inconfundível do café, aliado à vibe descontraída do local, faz do Ernesto um lugar onde os momentos ganham sabor e memória. E, claro, é impossível não se deixar levar pela variedade de opções irresistíveis no cardápio, que vão muito além do café, criando uma experiência completa para todos os sentidos.',
    horario: 'Todos os dias  • 07h - 22h',
    imagem: require('../img/ernesto.jpeg'),
  },
  {
    id: '6',
    nome: 'Casa de Chá',
    local: 'Praça dos Três Poderes - Brasília, DF',
    descricao: 'Projetada entre 1965 e 1966 pelo renomado arquiteto Oscar Niemeyer, a Casa de Chá foi concebida para ser um ponto de encontro e um local para reuniões e descanso na monumental Praça dos Três Poderes. Em 2024, o Senac-DF estabelece sua presença na Casa de Chá com propósitos sociais, culturais e educacionais. Ao inaugurar uma empresa pedagógica de gastronomia busca proporcionar experiências autênticas tanto para a comunidade quanto para os estudantes em atuação no local. Visitantes, sejam turistas ou residentes de Brasília, terão a oportunidade de explorar um espaço histórico de significativo valor arquitetônico modernista e desfrutar de uma experiência gastronômica genuinamente brasileira, com um viés contemporâneo. Sob a expertise do renomado chef brasiliense Gil Guimarães, o menu da Casa de Chá foi cuidadosamente concebido, incorporando elementos dos diversos biomas brasileiros para representar a diversidade do país em cada prato.',
    horario: 'Quarta a domingo • 10h30 - 19h30 | Cozinha até 19h',
    imagem: require('../img/casadecha.jpeg'),
  },
  {
    id: '7',
    nome: 'Chico',
    subtitulo: 'Banca e Café',
    local: 'Asa Sul SQS 207 Banca de Jornal - Asa Sul, Brasília - DF',
    descricao: 'Chico - Banca e Café é uma marca que representa um cantinho afetivo e único em Brasília. O local ideal para um bom café, uma boa leitura e para se sentir acolhido. Com um conceito inovador e urbano, a banca localizada na Asa Sul de Brasília tem muita história em suas raízes. De origem familiar, o espaço que antes era apenas uma banca de jornal, deu origem também a uma cafeteria e a um showroom de azulejos, este último fruto de uma parceria. As palavras-chave que compõe este projeto são: café, leitura, prosa e aconchego. Meus clientes queriam um projeto que representasse atributos de uma marca criativa, good vibes, urbana, mas também afetuosa e acolhedora. Apesar de ser um projeto minimalista, ele traz muito significado. A construção do conceito e do logotipo se basearam nas formas geométricas tão presentes em Brasília, assim como no formato de suas bancas de jornal.',
    horario: 'Terça a domingo  • 08h - 19h',
    imagem: require('../img/chicocafe.webp'),
  },
  {
    id: '8',
    nome: 'Café e um Chêro',
    local: 'SCRLN 715 bloco D loja 43 - Asa Norte, Brasília - DF',
    descricao: 'Cozinha e memórias por Dona Alba. O chêro do bolo de macaxeira com coco invade todos os cômodos do sítio. Na boca do fogão, o bule do café começa a ferver. O janelão emoldura o belo cenário. É simples e tão bonito de apreciar. Os jarrinhos de barro com flores colorem a paisagem. O canto dos pássaros e o cacarejo das galinhas são como música para os ouvidos. Enquanto isso, Dona Alba prepara um mesão com as receitas de família. Sua carne de panela, cozida lentamente e desfiada com cautela, está à espera do pão fresquinho. Já a massa da tapioca precisa de mais um tempinho para ficar macia. Aos poucos, tudo vai ficando pronto. Antes de ajudar a mãe, João Gabriel se refresca com a água do filtro de barro disposto no canto da cozinha. Na mesa, há pratos de ágata, copo americano e muito afeto. Família reunida, é hora de reviver memórias, dar boas risadas e contar velhas histórias.',
    horario: 'Terça a Sábado • 10h às 19h.',
    imagem: require('../img/cafechero.webp'),
  },
];

const DetalhesScreen = ({ route, navigation }) => {
  const { cafeId } = route.params;
  const { favoritos, toggleFavorito } = useContext(FavoritosContext);

  const cafe = cafes.find((c) => c.id === cafeId);

  if (!cafe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Café não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const isFavorito = favoritos.some(c => c.id === cafe.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={cafe.imagem} style={styles.image} resizeMode="cover" />

        <View style={styles.titleContainer}>
          <Text style={styles.nome}>{cafe.nome}</Text>

          <TouchableOpacity
            style={styles.heartIcon}
            onPress={() => toggleFavorito(cafe)}
          >
            <FontAwesome
              name={isFavorito ? 'heart' : 'heart-o'}
              size={28}
              color="#7a4e28"
            />
          </TouchableOpacity>
        </View>

        {cafe.subtitulo ? <Text style={styles.subtitulo}>{cafe.subtitulo}</Text> : null}

           {/* Sobre */}
        <View style={styles.section}>
          <MaterialIcons name="info-outline" size={24} color="#7a4e28" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.sectionText}>{cafe.descricao || 'Sem descrição disponível.'}</Text>
          </View>
          </View>

        {/* Horário */}
        <View style={styles.section}>
          <MaterialIcons name="schedule" size={24} color="#7a4e28" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Horário</Text>
            <Text style={styles.sectionText}>{cafe.horario || 'Horário não disponível.'}</Text>
          </View>
        </View>

        {/* Localização */}
        <View style={styles.section}>
          <MaterialIcons name="location-pin" size={24} color="#7a4e28" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <Text style={styles.sectionText}>{cafe.local}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ccb2' },
  scrollContainer: { padding: 20 },
  image: {
    width: 550,
    height: 320,
    borderRadius: 15,
    marginBottom: 20,
    alignSelf: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5d2c04',
  },
  heartIcon: {
    padding: 5,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7a4e28',
    marginBottom: 20,
    textAlign: 'left',
  },
  section: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 3,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5d2c04',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#5d2c04',
    lineHeight: 22,
  },
  errorText: {
    marginTop: 40,
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  favButton: {
    marginTop: 30,
    backgroundColor: '#d8b49c',
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  favButtonText: {
    color: '#7a4e28',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default DetalhesScreen;
