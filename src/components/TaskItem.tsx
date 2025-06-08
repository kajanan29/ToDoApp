import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Share,
  Image,
} from 'react-native';
import { Task } from '../types/Task';
import { useTaskStore } from '../store/useTaskStore';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();
  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

  const formattedDate = new Date(task.createdAt).toLocaleString();

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false); // Close the delete confirmation modal after deletion
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Close the delete confirmation modal without deleting
  };

  const handleShare = async (platform: string) => {
    await Share.share({
      message: `[${platform}] ${task.title}: ${task.description}`,
    });
    setShowShareModal(false);
  };

  const handleSave = () => {
    updateTask(task.id, editTitle.trim(), editDescription.trim());
    setShowEditModal(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.9}
      >
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>

        {/* Delete Button */}
        <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={styles.deleteButton}>
          <Image source={require('../images/close.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Expanded Actions */}
      {expanded && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setShowShareModal(true)} style={styles.actionButton}>
            <Image source={require('../images/share.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowInfo(!showInfo)} style={styles.actionButton}>
            <Image source={require('../images/info.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEditModal(true)} style={styles.actionButton}>
            <Image source={require('../images/edit.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      )}

      {showInfo && <Text style={styles.infoText}>Created: {formattedDate}</Text>}

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.shareModal}>
            <View style={styles.shareIcons}>
              <TouchableOpacity onPress={() => handleShare('Copy')}>
                <Image source={require('../images/copy.png')} style={styles.shareIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare('VK')}>
                <Image source={require('../images/vk.png')} style={styles.shareIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare('Telegram')}>
                <Image source={require('../images/telegram.png')} style={styles.shareIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare('WhatsApp')}>
                <Image source={require('../images/whatsapp.png')} style={styles.shareIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare('Facebook')}>
                <Image source={require('../images/facebook.png')} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowShareModal(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <TextInput
              style={styles.input}
              placeholder="Mini Input..."
              placeholderTextColor="#FF8303"
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Max Input..."
              placeholderTextColor="#FF8303"
              value={editDescription}
              onChangeText={setEditDescription}
              multiline
            />
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setShowEditModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={handleSave}>
                <Text style={styles.cancelText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>
            <Text style={styles.deleteText}>Do you want to delete this task?</Text>
            <View style={styles.deleteActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={handleCancelDelete}>
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={handleDelete}>
                <Text style={styles.cancelText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1E1B',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#FF8303',
    position: 'relative',
  },
  title: {
    color: '#F0E3CA',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#F0E3CA',
    marginTop: 4,
    fontSize: 13,
  },
  deleteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
    alignSelf: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#2C2B29',
    borderWidth: 1,
    borderColor: '#FF8303',
    padding: 8,
    borderRadius: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  shareModal: {
    backgroundColor: '#1F1E1B',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: '#FF8303',
    borderWidth: 1,
  },
  shareIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  shareIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#F0E3CA',
    fontWeight: 'bold',
  },
  editModal: {
    backgroundColor: '#1F1E1B',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF8303',
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF8303',
    backgroundColor: '#1F1E1B',
    color: '#F0E3CA',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF8303',
    borderRadius: 6,
  },
  deleteModal: {
    backgroundColor: '#1F1E1B',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF8303',
    width: '90%',
    alignSelf: 'center',
  },
  deleteText: {
    color: '#F0E3CA',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  deleteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TaskItem;
