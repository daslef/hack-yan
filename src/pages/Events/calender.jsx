import React, { useState } from 'react';
import { Calendar, Modal, Form, Input, Button, message } from 'antd';
import './calender.css'; // Импортируем кастомные стили для календаря

const EventCalendar = () => {
  const [events, setEvents] = useState([
    { id: 1, date: '2024-04-01', event: 'Покормить пёсиков' },
    { id: 2, date: '2024-04-10', event: 'Презентация проекта' },
    // Добавьте здесь еще события по вашему усмотрению
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();

  const handleSelect = (value) => {
    const date = value.format('YYYY-MM-DD');
    setSelectedDate(date);
    const event = events.find((event) => event.date === date);
    if (event) {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(null);
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedDate('');
    setSelectedEvent(null);
    form.resetFields();
  };

  const onFinish = (values) => {
    const { event } = values;
    if (selectedEvent) {
      setEvents(events.map(item => (item.id === selectedEvent.id ? { ...item, event } : item)));
      message.success('Событие успешно обновлено');
    } else {
      const id = events.length ? events[events.length - 1].id + 1 : 1;
      setEvents([...events, { id, date: selectedDate, event }]);
      message.success('Событие успешно создано');
    }
    handleCancel();
  };

  const handleDelete = () => {
    setEvents(events.filter(item => item.id !== selectedEvent.id));
    message.success('Событие успешно удалено');
    handleCancel();
  };

  return (
    <div className="event-calendar">
      <Calendar
        onSelect={handleSelect}
        dateCellRender={(value) => {
          const date = value.format('YYYY-MM-DD');
          const event = events.find((event) => event.date === date);
          return (
            <div>
              {event && <div className="event">{event.event}</div>}
            </div>
          );
        }}
      />
      <Modal
        title={selectedEvent ? 'Редактировать событие' : 'Создать событие'}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} initialValues={{ event: selectedEvent ? selectedEvent.event : '' }}>
          <Form.Item name="event" rules={[{ required: true, message: 'Пожалуйста, введите название события' }]}>
            <Input placeholder="Название события" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedEvent ? 'Сохранить' : 'Создать'}
            </Button>
            {selectedEvent && (
              <Button type="danger" onClick={handleDelete} style={{ marginLeft: 8 }}>
                Удалить
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventCalendar;









