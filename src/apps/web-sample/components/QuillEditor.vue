<template>
  <div>
    <!-- Quill Editor Container -->
    <div ref="editor" style="height: 300px;"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill's Snow theme CSS

export default {
  name: 'QuillEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editor = ref(null); // Reference to the editor container
    let quillInstance = null; // Quill instance

    // Initialize Quill
    onMounted(() => {
      quillInstance = new Quill(editor.value, {
        theme: 'snow', // Use the Snow theme
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // Text formatting
            [{ header: [1, 2, 3, false] }], // Headers
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            ['link', 'image'], // Links and images
            ['clean'], // Remove formatting
          ],
        },
        placeholder: 'Write something...',
      });

      // Set initial content
      quillInstance.root.innerHTML = props.modelValue;

      // Emit changes to the parent component
      quillInstance.on('text-change', () => {
        const content = quillInstance.root.innerHTML;
        emit('update:modelValue', content);
      });
    });

    // Clean up Quill instance
    onBeforeUnmount(() => {
      if (quillInstance) {
        quillInstance.off('text-change');
        quillInstance = null;
      }
    });

    return {
      editor,
    };
  },
};
</script>