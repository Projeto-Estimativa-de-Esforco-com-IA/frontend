import {Button, Modal, TextInput} from "@mantine/core";
import {useForm} from '@mantine/form';
import {useContext, useEffect} from "react";
import {DataContext} from "@/DataProvider";

const CreateTopicModal = ({open, setOpened, editTopic}) => {
    const {createTopic, updateTopic} = useContext(DataContext);

    const form = useForm({
        initialValues: {
            title: '',
            desc: '',
            url: ''
        },

        validate: {
            title: (value) => value ? null : 'Título obrigatório',
        },
    });

    const onSubmit = async (val) => {
        if (editTopic) {
            updateTopic(editTopic.topic_id, val.title, val.desc, val.url)
        } else {
            createTopic(val.title, val.desc, val.url)
        }

        setOpened(false);
        form.reset();
    }

    useEffect(() => {
        if (!editTopic) return;

        form.setValues({
            title: editTopic.title,
            desc: editTopic.description,
            url: editTopic.url,
        })
    }, [editTopic]);

    return (
        <Modal
            opened={open}
            onClose={() => setOpened(false)}
            title={editTopic ? 'Alterar detalhes do tópico' : "Criar novo tópico"}
        >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                    <TextInput
                        autoFocus={true}
                        placeholder="Digite um título para o tópico"
                        label="Título"
                        withAsterisk
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        placeholder="Digite uma breve descrição sobre o tópico"
                        label="Descrição"
                        {...form.getInputProps('desc')}
                    />
                    <TextInput
                        placeholder="Ex: https://empresa.atlassian.net/browse/TICKET-5616"
                        label="URL do Ticket"
                        {...form.getInputProps('url')}
                    />

                    <Button type="submit" w="100%" mt={20}>
                        {editTopic ? 'Alterar Detalhes' : 'Criar Tópico'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateTopicModal;