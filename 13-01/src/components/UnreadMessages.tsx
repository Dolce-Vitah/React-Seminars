import React, { useState, useEffect } from "react";

const UnreadMessages: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const randomCount = Math.floor(Math.random() * 10) + 1;
        setCount(randomCount);
    }, []);

    const pluralRules = new Intl.PluralRules('ru-RU');

    const templates: Record<string, string> = {
        one: 'У вас {count} непрочитанное сообщение ({date})',
        few: 'У вас {count} непрочитанных сообщения ({date})',
        many: 'У вас {count} непрочитанных сообщений ({date})',
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const pluralForm = pluralRules.select(count);
    const date = formatDate(new Date());

    const message = templates[pluralForm]
    .replace('{count}', String(count))
    .replace('{date}', date);

    return <div>{message}</div>
};

export default UnreadMessages;