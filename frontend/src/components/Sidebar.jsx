import {Button, NavLink, Text, Title} from "@mantine/core";
import {FaDoorOpen, FaPlus} from "react-icons/fa";
import {useContext, useState} from "react";
import {DataContext} from "@/DataProvider";
import TopicCard from "@/components/TopicCard";
import CreateTopicModal from "@/components/CreateTopicModal";
import TopicDetailsModal from "@/components/TopicDetailsModal";

const Sidebar = () => {
    const {recentRooms, room, joinRoom} = useContext(DataContext);
    const [createOpened, setCreateOpened] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const openRecentRoom = (roomId) => {
        joinRoom(roomId)
    }

    if (!room) {
        return (
            <div>
                <Text size="lg">Suas salas recentes:</Text>
                {Object.keys(recentRooms).length > 0 ?
                    <div style={{marginTop: 10}}>
                        {Object.keys(recentRooms)
                            .sort((a, b) => recentRooms[a].created_at < recentRooms[b].created_at)
                            .slice(0, 10)
                            .map((roomId) => (
                                <NavLink onClick={() => openRecentRoom(roomId)} key={roomId}
                                         label={new Date(recentRooms[roomId].created_at).toLocaleString()}
                                         leftSection={<FaDoorOpen/>}/>
                            ))}
                    </div>
                    :
                    <Text c="dimmed">Nenhuma sala recente</Text>
                }
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 24,
            paddingBottom: 32,
            background: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderRadius: 18,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 32px 0 rgba(30,44,78,0.13)',
            minHeight: 400,
            gap: 18
        }}>
            <Title size="sm">Tópicos:</Title>
            <div style={{width: '100%', marginTop: 20}}>
                <Button onClick={() => setCreateOpened(true)} w="100%" h={56} variant="outline" rightSection={<FaPlus/>} style={{color: '#fff', backgroundColor: '#1E2C4E', borderColor: '#1E2C4E', borderRadius: 12, fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px 0 rgba(30,44,78,0.08)'}}>
                    Criar Novo Tópico
                </Button>
            </div>
            <div style={{display: 'flex', flexDirection: "column", gap: 16, marginTop: 20}}>
                {Object.keys(room.topics).length > 0 && Object.keys(room.topics).map((topic) => (
                    <TopicCard key={topic} onSelect={(topic) => setSelectedTopic(topic)} topic={room.topics[topic]}/>
                ))}
            </div>
            <CreateTopicModal open={createOpened} setOpened={setCreateOpened}/>
            <TopicDetailsModal selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/>
        </div>
    )
}

export default Sidebar;