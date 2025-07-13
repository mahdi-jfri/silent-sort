import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import {Play} from 'lucide-react';
import Image from 'next/image'
import Layout from "@/components/Layout";
import Head from "next/head";
import GameRules from "@/components/GameRules";
import {storageKeys} from "@/constants";

export default function HomePage() {
    const router = useRouter();
    const roomId = router.query.room;
    const [playerName, setPlayerName] = useState<string>('');

    useEffect(() => {
        if (!router.isReady)
            return;
        if (!roomId) {
            router.push('/');
            return;
        }
    }, [router, roomId]);

    useEffect(() => {
        const savedName = localStorage.getItem(storageKeys.playerName);
        if (savedName) {
            setPlayerName(savedName);
        }
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value);
        localStorage.setItem(storageKeys.playerName, e.target.value);
    };

    const handleJoin = () => {
        if (!playerName.trim()) {
            alert("Please enter a player name.");
            return;
        }
        router.push({pathname: "/room/", query: {room: roomId}});
    };

    return (
        <Layout>
            <Head>
                <title>Silent Sort - Join Room</title>
            </Head>
            <main className="min-h-screen flex items-center justify-center p-4">
                <Container maxWidth="sm">
                    <Paper elevation={6}
                           className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                        <Box className="flex justify-center items-center gap-3 mb-4">
                            <Image src={`${router.basePath}/icon.png`} width={50} height={0}
                                   alt="Silent sort game icon"/>
                            <Typography variant="h3" component="h1"
                                        className="font-bold text-slate-800 dark:text-slate-100">
                                Silent Sort
                            </Typography>
                        </Box>

                        <Box component="form" className="flex flex-col gap-6">
                            <TextField
                                fullWidth
                                required
                                label="Name"
                                variant="outlined"
                                value={playerName}
                                onChange={handleNameChange}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<Play/>}
                                onClick={handleJoin}
                                disabled={!playerName.trim()}
                                className="!py-3 !font-bold !text-lg"
                            >
                                Join
                            </Button>
                        </Box>
                    </Paper>
                    <GameRules/>
                </Container>
            </main>
        </Layout>
    );
}
