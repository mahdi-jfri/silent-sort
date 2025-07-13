import React from 'react';
import {Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Tooltip} from '@mui/material';
import {Users, Crown, User} from 'lucide-react';
import {CardType, Player} from "@/types";
import CardComponent from "@/components/Card";

interface PlayerListProps {
    players: Player[];
    selfId: string;
    cards: CardType[];
}

const PlayerList = ({players, selfId, cards}: PlayerListProps) => {
    const getPlayerTitle = (player: Player) => {
        if (selfId === player.id)
            return 'You';
        if (player.is_owner)
            return 'Room Owner';
        return 'Player';
    }

    return (
        <Paper elevation={3} className="p-6 rounded-xl bg-white dark:bg-slate-800 h-full">
            <Typography
                variant="h5"
                component="h2"
                className="font-bold mb-4 flex items-center text-gray-800 dark:text-gray-100"
            >
                <Users className="mr-3 text-blue-500"/>
                Players ({players.length})
            </Typography>
            <List className="space-y-3">
                {players.map((player, index) => (
                    <ListItem
                        key={index}
                        className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg shadow-sm transition-transform"
                    >
                        <ListItemAvatar>
                            <Tooltip title={getPlayerTitle(player)} placement="left">
                                <Avatar className={index === 0
                                    ? "bg-amber-400 text-white"
                                    : "bg-gray-400 dark:bg-gray-500 text-white"
                                }>
                                    {player.is_owner ? <Crown size={24}/> : <User size={24}/>}
                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                            slotProps={{
                                primary: {
                                    className: 'font-semibold truncate text-gray-700 dark:text-gray-200'
                                },
                                secondary: {
                                    className: 'text-gray-500 dark:text-gray-400'
                                }
                            }}
                            primary={player.name}
                            secondary={getPlayerTitle(player)}
                        />
                        <div className="overflow-x-scroll flex flex-row w-1/4 md:w-1/2">
                            {cards.filter(card => card.holder == player.id).sort(
                                (a, b) => a.number - b.number
                            ).map((card, index) =>
                                <CardComponent key={index} number={card.number} small isPlayed/>
                            )}
                        </div>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PlayerList;
