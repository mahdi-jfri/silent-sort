import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Container, Grid, Paper, Typography, Box, CircularProgress, Chip, Snackbar, Alert} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShareIcon from '@mui/icons-material/Share';
import {Hash, Users} from 'lucide-react';

import PlayerList from '@/components/PlayerList';
import GameBoard from '@/components/GameBoard';
import CombinedModal from '@/components/Modal';
import {generateTechName} from "@/utils/nameGenerator";
import {AlertType, GameState, Player, CardType} from "@/types";
import Layout from "@/components/Layout";
import {AlertColor} from "@mui/material/Alert";
import Image from "next/image";
import {useRouter} from "next/router";
import Head from "next/head";
import {storageKeys} from "@/constants";
import urlJoin from "url-join";

interface Notification {
    show: boolean;
    message: string;
    type: AlertType;
}

interface GameData {
    state: GameState;
    players: Player[];
    played_cards: CardType[];
    all_cards?: CardType[];
}

interface PersonalData {
    id: string;
    is_owner: boolean;
    cards: CardType[];
}

interface SnackbarData {
    open: boolean;
    message: string;
    severity: AlertColor;
}

export default function RoomPage() {
    const router = useRouter();
    const roomId = router.query.room;
    const [name, setName] = useState<string>();

    const [gameData, setGameData] = useState<GameData | null>(null);
    const [personalData, setPersonalData] = useState<PersonalData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<Notification>({show: false, message: '', type: 'info'});
    const ws = useRef<WebSocket | null>(null);

    const [snackbar, setSnackbar] = useState<SnackbarData>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (!roomId) return;

        const localStorageName = localStorage.getItem(storageKeys.playerName) || generateTechName();
        setName(localStorageName);

        const wsUrl = `${process.env.NEXT_PUBLIC_BACKEND_WS_URL}/?room_id=${roomId}&name=${localStorageName}`;
        ws.current = new WebSocket(wsUrl);
        setIsLoading(true);

        ws.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received data:', data);

            if (data.game_data) {
                setGameData(data.game_data);
            }
            if (data.personal_data) {
                setPersonalData(data.personal_data);
            }

            setIsLoading(false);
        };

        ws.current.onclose = () => {
            console.log('WebSocket connection closed');
            setNotification({show: true, message: 'Connection to the server was lost.', type: 'error'});
            setIsLoading(false);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setNotification({show: true, message: 'A connection error occurred.', type: 'error'});
            setIsLoading(false);
        };

        return () => {
            ws.current?.close();
        };
    }, [roomId]);

    const sendMessage = async (type: number, payload: object = {}) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({type, data: payload});
            return ws.current.send(message);
        }
    };

    const handleStartGame = () => sendMessage(2);
    const handlePlayCard = (cardId: string) => sendMessage(3, {card_id: cardId});
    const handleRestartGame = () => sendMessage(4).then(() => handleStartGame());

    const copyLinkToClipboard = useCallback(() => {
        let basePath: string;
        if (router.basePath)
            basePath = urlJoin(window.location.origin, router.basePath);
        else
            basePath = window.location.origin;
        const currentUrl = urlJoin(basePath, `/join?room=${roomId}`);

        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                setSnackbar({open: true, message: 'Invite link copied to clipboard!', severity: 'success'});
            })
            .catch(err => {
                console.error("Failed to copy link: ", err);
                setSnackbar({open: true, message: 'Failed to copy link.', severity: 'error'});
            });
    }, [router, roomId]);

    if (isLoading) {
        return (
            <Box className="flex flex-col items-center justify-center min-h-screen">
                <CircularProgress size={60}/>
                <Typography variant="h6" className="mt-4 text-gray-600 dark:text-gray-300">
                    Joining Room...
                </Typography>
            </Box>
        );
    }

    return (
        <Layout>
            <Head>
                <title>Silent Sort - Room {roomId}</title>
            </Head>
            <main className="min-h-screen p-4 sm:p-6 md:p-8">
                <Container maxWidth="lg">
                    <Paper elevation={3}
                           className="p-4 mb-8 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <Box className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <Typography variant="h4" component="h1"
                                        className="font-bold text-gray-800 dark:text-gray-100 flex items-center">
                                <Image src={`${router.basePath}/icon.png`} width={40} height={0} alt="Silent sort game icon" className="mr-3"/>
                                Silent Sort
                            </Typography>
                            <Box className="flex flex-wrap justify-center items-center gap-4 max-w-full">
                                {(gameData?.state == GameState.WON || gameData?.state == GameState.LOST) &&
                                    personalData?.is_owner &&
                                    <Chip icon={<RestartAltIcon/>} label={"Restart"} variant="outlined"
                                          onClick={handleRestartGame}
                                          className="hover:cursor-pointer"
                                          color="success"/>
                                }
                                <Chip icon={<Hash size={18}/>} label={`Room: ${roomId}`} variant="outlined"
                                      color="primary"/>
                                <Chip icon={<Users size={18}/>} label={`Player: ${name}`} variant="outlined"
                                      color="secondary" className="truncate max-w-full"/>
                                <Chip icon={<ShareIcon/>} label={"Invite"} variant="outlined"
                                      onClick={copyLinkToClipboard}
                                      className="hover:cursor-pointer"
                                      color="default"/>
                            </Box>
                        </Box>
                    </Paper>

                    <Grid container spacing={4}>
                        <Grid size={{xs: 12, md: 4}}>
                            <PlayerList players={gameData?.players || []} selfId={personalData?.id || ""}
                                        cards={gameData?.all_cards || []}/>
                        </Grid>
                        <Grid size={{xs: 12, md: 8}}>
                            <GameBoard
                                gameState={gameData?.state || null}
                                isOwner={personalData?.is_owner || false}
                                players={gameData?.players || []}
                                playedCards={gameData?.played_cards || []}
                                playerCards={personalData?.cards || []}
                                onStartGame={handleStartGame}
                                onPlayCard={handlePlayCard}
                            />
                        </Grid>
                    </Grid>
                </Container>

                <CombinedModal
                    open={notification.show}
                    onClose={() => setNotification({...notification, show: false})}
                    message={notification.message}
                    type={notification.type}
                />
            </main>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({...snackbar, open: false})}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setSnackbar({...snackbar, open: false})}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Layout>
    );
}
