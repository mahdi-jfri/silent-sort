import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Divider,
} from '@mui/material';
import {Play, LogIn} from 'lucide-react';
import Image from 'next/image'
import Layout from "@/components/Layout";
import Head from "next/head";

export default function HomePage() {
    const [roomId, setRoomId] = useState<string>('');
    const [playerName, setPlayerName] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const savedName = localStorage.getItem('silentSortPlayerName');
        if (savedName) {
            setPlayerName(savedName);
        }
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value);
        localStorage.setItem('silentSortPlayerName', e.target.value);
    };

    const handleJoin = (targetRoomId: string) => {
        if (!playerName.trim()) {
            alert("Please enter a player name.");
            return;
        }
        router.push({pathname: "/room/", query: {room: targetRoomId}});
    };

    const createAndJoinRoom = () => {
        const newRoomId = Math.random().toString(36).substring(2, 8);
        handleJoin(newRoomId);
    };

    const joinExistingRoom = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomId.trim()) {
            handleJoin(roomId);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Silent Sort</title>
            </Head>
            <main className="min-h-screen flex items-center justify-center p-4">
                <Container maxWidth="sm">
                    <Paper elevation={6}
                           className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                        <Box className="flex justify-center items-center gap-3 mb-4">
                            <Image src={`${router.basePath}/icon.png`} width={50} height={0} alt="Silent sort game icon"/>
                            <Typography variant="h3" component="h1"
                                        className="font-bold text-slate-800 dark:text-slate-100">
                                Silent Sort
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={joinExistingRoom} className="flex flex-col gap-6">
                            <TextField
                                fullWidth
                                required
                                label="Name"
                                variant="outlined"
                                value={playerName}
                                onChange={handleNameChange}
                            />

                            <Divider>
                                <Typography className="font-semibold text-slate-500">CREATE</Typography>
                            </Divider>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<Play/>}
                                onClick={createAndJoinRoom}
                                disabled={!playerName.trim()}
                                className="!py-3 !font-bold !text-lg"
                            >
                                Create a New Room
                            </Button>

                            <Divider>
                                <Typography className="font-semibold text-slate-500">OR JOIN</Typography>
                            </Divider>

                            <Box className="flex items-stretch gap-2">
                                <TextField
                                    fullWidth
                                    label="Enter Room ID"
                                    variant="outlined"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={!roomId.trim() || !playerName.trim()}
                                    className="!px-6"
                                >
                                    <LogIn/>
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                    <div className="w-full max-w-2xl px-4 py-8 text-center">
                        <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-geist-sans)]">Game Rules</h2>
                        <ol className="text-left list-decimal list-inside space-y-2">
                            <li><strong>Each player is dealt one card when the game starts.</strong></li>
                            <li><strong>Each card has a unique number on it from 1 to 100.</strong></li>
                            <li><strong>The player with minimum number on their card must play it before anyone else. If they fail to do so, everyone loses.</strong></li>
                            <li><strong>If all cards are played in order of their number, everyone wins!</strong></li>
                        </ol>
                    </div>
                </Container>
            </main>
        </Layout>
    );
}
