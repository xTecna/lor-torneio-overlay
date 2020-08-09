import React, {useState} from 'react';

import {JogadorDecks, Jogador as JogadorDiv, Superior, ScoreNome, ScoreNomeWebcam, Score, Nome, Time, TimeRegionChampions, RegionChampions, Webcam, Regions, Region, Champions, Champion, Decks, Deck, ChampionsDeck, QtdChampionDeck, ChampionDeck} from './style';

const Jogador = ({nome, url_imagem, region1, region2, champion1, champion2, champion3, champion4, champion5, champion6}) => {
	return (
		<>
			<JogadorDecks>
				<JogadorDiv>
					<Superior>
						<ScoreNomeWebcam>
							<ScoreNome>
								<Score>0</Score>
								<Nome nome={nome.length <= 10 ? "4vh" : (nome.length <= 20 ? "3vh" : "2vh")}>{nome}</Nome>
							</ScoreNome>
							<Webcam>{url_imagem}</Webcam>
						</ScoreNomeWebcam>
						<TimeRegionChampions>
							<Time>
								<img src="https://media.discordapp.net/attachments/703593969820631050/739497322580541540/WNX.png"/>
							</Time>
							<RegionChampions>
								<Regions>
									<Region>
										<img src="http://dd.b.pvp.net/1_6_0/core/en_us/img/regions/icon-noxus.png"/>
									</Region>
									<Region>
										<img src="http://dd.b.pvp.net/1_6_0/core/en_us/img/regions/icon-ionia.png"/>
									</Region>
								</Regions>
								<Champions>
									<Champion>
										<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Ezreal.png"/>
									</Champion>
									<Champion>
										<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Lux.png"/>
									</Champion>
									<Champion>
										<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Braum.png"/>
									</Champion>
									<Champion>
										<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Karma.png"/>
									</Champion>
									<Champion>
										<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Zoe.png"/>
									</Champion>
									<Champion>
										<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Lulu.png"/>
									</Champion>
								</Champions>
							</RegionChampions>
						</TimeRegionChampions>
					</Superior>
				</JogadorDiv>
				<Decks>
					<Deck>
						<ChampionsDeck className="victory" inline={false}>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Ezreal.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Lux.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Braum.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Karma.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Zoe.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Lulu.png"/>
							</ChampionDeck>
						</ChampionsDeck>
					</Deck>
					<Deck>
						<ChampionsDeck inline={true}>
							<ChampionDeck>
								<QtdChampionDeck>
									2
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Ezreal.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
									2
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Lux.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
									2
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Braum.png"/>
							</ChampionDeck>
							{/* <ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Karma.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Zoe.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Lulu.png"/>
							</ChampionDeck> */}
						</ChampionsDeck>
					</Deck>
					<Deck>
						<ChampionsDeck className="ban" inline={false}>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Ashe.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Sejuani.png"/>
							</ChampionDeck>
							{/* <ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Braum.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Karma.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Zoe.png"/>
							</ChampionDeck>
							<ChampionDeck>
								<QtdChampionDeck>
								
								</QtdChampionDeck>
								<img src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/Lulu.png"/>
							</ChampionDeck> */}
						</ChampionsDeck>
					</Deck>
				</Decks>
			</JogadorDecks>
		</>
	)
};

export default Jogador;
