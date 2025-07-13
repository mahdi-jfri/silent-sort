export default function GameRules() {
    return (
        <div className="w-full max-w-2xl px-4 py-8 text-center">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-geist-sans)]">Game Rules</h2>
            <ol className="text-left list-decimal list-inside space-y-2">
                <li><strong>Each player is dealt one card when the game starts.</strong></li>
                <li><strong>Each card has a unique number on it from 1 to 100.</strong></li>
                <li><strong>The player with minimum number on their card must play it before anyone else. If they fail
                    to do so, everyone loses.</strong></li>
                <li><strong>If all cards are played in order of their number, everyone wins!</strong></li>
            </ol>
        </div>
    )
}