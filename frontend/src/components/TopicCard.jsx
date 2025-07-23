import {ActionIcon, Button, Card, Menu, Select, Text, Tooltip} from "@mantine/core";
import {FaCoffee, FaHashtag, FaRegComment} from "react-icons/fa";
import {useHover} from "@mantine/hooks";
import {Fragment, useContext, useState} from "react";
import {DataContext} from "@/DataProvider";
import {FaEllipsis, FaLink} from "react-icons/fa6";
import CompleteTopicModal from "@/components/CompleteTopicModal";
import CreateTopicModal from "@/components/CreateTopicModal";


const TopicCard = ({topic, onSelect}) => {
    const {room, setVotingTopic, resetTopic, removeTopic} = useContext(DataContext);
    const {hovered, ref} = useHover();
    const [completeTopic, setCompleteTopic] = useState();
    const [editTopic, setEditTopic] = useState();

    const isCompleted = () => {
        return topic?.completed;
    }

    const isVoting = () => {
        return room?.current_topic_id && topic?.topic_id === room?.current_topic_id;
    }

    const getBgColor = () => {
        if (isCompleted()) {
            return '#b2f2bb'
        }

        if (isVoting()) {
            return '#ffd8a8'
        }

        if (hovered) {
            return 'rgba(0,0,0,0.05)'
        }

        return 'white'
    }

    const getButtonText = () => {
        if (isCompleted()) {
            return "Concluído"
        }

        if (isVoting()) {
            return "Em votação..."
        }

        return "Iniciar votação"
    }

    const renderPoints = () => {
        if (topic.points === "no_ans") {
            return '?'
        }

        if (topic.points === "coffee") {
            return <FaCoffee/>
        }

        return topic.points;
    }

    const _onSelect = () => {
        onSelect(topic)
    }

    return (
        <Fragment>
            <CreateTopicModal open={!!editTopic} editTopic={editTopic} setOpened={setEditTopic}/>
            <CompleteTopicModal topic={completeTopic} setCompleteTopic={setCompleteTopic}/>
            <Card onClick={() => _onSelect()} ref={ref} shadow="sm" p="lg" radius="md" withBorder style={{
                background: 'rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: hovered ? '0 4px 24px 0 rgba(30,44,78,0.13)' : '0 2px 8px 0 rgba(30,44,78,0.07)',
                borderRadius: 16,
                transition: 'box-shadow 0.2s, background 0.2s',
                padding: 24,
                marginBottom: 8,
                cursor: 'pointer'
            }}>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', wordBreak: 'break-word'}}>
                        <Text fw="bold" size="md">{topic.title}</Text>
                    </div>

                    <Menu withinPortal position="bottom-start" shadow="sm">
                        {topic.url &&
                            <Tooltip label={topic.url}>
                                <ActionIcon color="gray" variant="subtle" onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(topic.url, '_blank').focus();
                                }}>
                                    <FaLink/>
                                </ActionIcon>
                            </Tooltip>
                        }
                        <Menu.Target>
                            <ActionIcon onClick={(e) => e.stopPropagation()} variant="subtle" color="gray">
                                <FaEllipsis/>
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={(e) => {
                                e.stopPropagation();
                                setEditTopic(topic)
                            }}>
                                Editar detalhes
                            </Menu.Item>
                            <Menu.Item onClick={(e) => {
                                e.stopPropagation();
                                resetTopic(topic.topic_id)
                            }}>
                                Resetar votos
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const res = window.confirm("Tem certeza que deseja excluir este tópico?");
                                    if (!res) return;
                                    removeTopic(topic.topic_id)
                                }}
                            >
                                Excluir tópico
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
                <Text mt={10} size="sm" color="dimmed" style={{marginBottom: 10}}>
                    {topic.description.length > 0 ? topic.description : 'Sem descrição...'}
                </Text>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 14,
                    marginTop: 18
                }}>
                    <Button disabled={isVoting() || isCompleted()} onClick={(e) => {
                        e.stopPropagation();
                        setVotingTopic(topic.topic_id)
                    }} variant="light" fullWidth radius="md" mr={10} style={{color: '#fff', backgroundColor: '#1E2C4E', borderColor: '#1E2C4E', borderRadius: 10, fontWeight: 600, fontSize: 15, padding: '10px 0', boxShadow: '0 2px 8px 0 rgba(30,44,78,0.08)'}}>
                        {getButtonText()}
                    </Button>
                    <Tooltip label="Comments">
                        <div style={{display: 'flex', flexDirection: 'row', gap: 3}}>
                            <FaRegComment/>
                            <Text size="xs">{topic?.comments.length}</Text>
                        </div>
                    </Tooltip>
                    <Tooltip label={`Pontos (${topic.points})`}>
                        <div style={{display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center'}}>
                            <FaHashtag/>
                            {isCompleted() ?
                                <Text>{renderPoints()}</Text> :
                                <Select
                                    placeholder="-"
                                    comboboxProps={{zIndex: 999999}}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCompleteTopic(topic.topic_id)
                                    }}
                                    size="xs"
                                    w={50}
                                />
                            }
                        </div>
                    </Tooltip>
                </div>
            </Card>
        </Fragment>
    )
}

export default TopicCard;