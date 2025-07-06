import React from 'react';
import {Paper, Typography, Button, Box} from '@mui/material';
import {Play, CheckCircle, XCircle} from 'lucide-react';
import Card from '@/components/Card';
import {CardType, GameState, Player} from "@/types";

interface GameBoardProps {
    gameState: GameState | null;
    isOwner: boolean;
    players: Player[];
    playedCards: CardType[];
    playerCards: CardType[];
    onStartGame: () => void;
    onPlayCard: (cardId: string) => void;
}

const GameBoard = ({
                       gameState,
                       isOwner,
                       players,
                       playedCards,
                       playerCards,
                       onStartGame,
                       onPlayCard
                   }: GameBoardProps) => {

    const renderGameStateMessage = (): React.ReactNode => {
        switch (gameState) {
            case GameState.LOBBY:
                return <Typography variant="h6" className="text-gray-500 dark:text-gray-400">Waiting for the owner to
                    start the game...</Typography>;
            case GameState.WON:
                return (
                    <Box className="flex flex-row gap-x-2 items-center text-green-500">
                        <CheckCircle size={48}/>
                        <Typography variant="h4" className="font-bold">YOU WON!</Typography>
                    </Box>
                );
            case GameState.LOST:
                return (
                    <Box className="flex flex-row gap-x-2 items-center text-red-500">
                        <XCircle size={48}/>
                        <Typography variant="h4" className="font-bold">GAME OVER</Typography>
                    </Box>
                );
            case GameState.PLAYING:
                return <Typography variant="h6" className="text-gray-500 dark:text-gray-400">Play your cards in
                    ascending order.</Typography>;
            default:
                return <Typography variant="h6" className="text-gray-500 dark:text-gray-400">Connecting to
                    game...</Typography>;
        }
    };

    return (
        <Paper elevation={3} className="p-6 sm:p-8 rounded-xl bg-white dark:bg-slate-800 text-center flex flex-col">
            <Box className="min-h-[100px] flex items-center justify-center mb-6">
                {renderGameStateMessage()}
            </Box>

            {gameState === GameState.LOBBY && isOwner && (
                <Button
                    onClick={onStartGame}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Play/>}
                    className="self-center font-bold text-lg py-3 px-10 rounded-lg shadow-lg !mb-8"
                >
                    Start Game
                </Button>
            )}

            <Box className="bg-gray-100 dark:bg-slate-700/50 p-6 rounded-lg min-h-[200px] mb-8 flex-grow">
                <Typography variant="h6" className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Played
                    Cards</Typography>
                <Box className="flex flex-wrap justify-center items-center gap-4">
                    {playedCards.length > 0 ? (
                        playedCards.map(card => (
                            <Card key={card.id} number={card.number} isPlayed={true}
                                  by={players.filter(player => player.id == card.holder)[0]?.name}/>
                        ))
                    ) : (
                        <Typography className="text-gray-500 dark:text-gray-400 mt-8">No cards played yet.</Typography>
                    )}
                </Box>
            </Box>

            {gameState === GameState.PLAYING && (
                <Box>
                    <Typography variant="h6" className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Your
                        Hand</Typography>
                    <Box className="flex flex-wrap justify-center items-center gap-4">
                        {playerCards.length > 0 ? (
                            playerCards.map(card => (
                                <Card
                                    key={card.id}
                                    number={card.number}
                                    isPlayed={playedCards.filter(playedCard => playedCard.id === card.id).length > 0}
                                    onClick={() => onPlayCard(card.id)}
                                />
                            ))
                        ) : (
                            <Typography className="text-gray-500 dark:text-gray-400">You have no cards to
                                play.</Typography>
                        )}
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default GameBoard;
