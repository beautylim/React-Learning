import { useRef, useState } from 'react';
import './CommentPage.css'; // 可选样式文件
import lodash from 'lodash'
import classNames from 'classnames'
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import { useComments } from './useComments';


const CommentPage = () => {

  const { comments, setComments } = useComments()
  const user = {
    id: 102,
    username: '李四',
    avatar: 'https://ui-avatars.com/api/?background=3498db&color=fff&name=李四'
  }

  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef(null)


  // 发表评论
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('请输入评论内容');
      return;
    }

    setIsLoading(true);

    // 模拟网络请求
    setTimeout(() => {
      const comment = {
        id: uuidV4(),
        userId: user.id,
        username: user.username.trim(),
        content: newComment.trim(),
        avatar: user.avatar,
        time: dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
        likes: 0
      };

      setComments(lodash.orderBy([comment, ...comments], 'likes', "desc"));
      setNewComment('');
      setIsLoading(false);
      textAreaRef.current.focus()
    }, 500);
  };

  // 删除评论
  const handleDelete = (id) => {
    if (comments.filter(comment => comment.id === id)[0].userId !== user.id) {
      alert('只能删除自己的评论哦~');
      return;
    }
    if (window.confirm('确定要删除这条评论吗？')) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  // 点赞评论
  const handleLike = (id: number) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        if (comment.liked) {
          return { ...comment, likes: comment.likes - 1, liked: false }
        } else {
          return { ...comment, likes: comment.likes + 1, liked: true }
        }
      } else {
        return comment
      }
    }));
  };
  // 格式化时间
  const formatTime = (time: string) => {
    const now = new Date();
    const commentTime = new Date(time);
    const diff = Math.floor((now - commentTime) / 1000);

    if (diff < 60) return '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    return time;
  };

  interface Comment {
    id: number,
    userId: number,
    username: string,
    content: string,
    avatar: string,
    time: string,
    likes: number,
    liked: boolean
  }

  const CommentItem = (props: { comment: Comment, onDelte: (id: number) => void, onLike: (id: number) => void }) => {
    const { comment, onDelte, onLike } = props
    const { id, userId, username, content, avatar, time, likes, liked } = comment
    return (
      <div key={id} style={styles.commentItem} >
        {/* 头像 */}
        < img
          src={avatar}
          alt={username}
          style={styles.avatar}
        />

        {/* 评论内容 */}
        < div style={styles.commentContent} >
          <div style={styles.commentHeader}>
            <span style={styles.username}> {username} </span>
            <span style={styles.time} > {formatTime(time)} </span>
          </div>
          <p style={styles.commentText} > {content} </p>
          <div style={styles.commentActions} >
            <button
              onClick={() => onLike(id)}
              style={liked ? styles.likedButton : styles.notLikedButton}
            >👍
              {likes > 0 && likes}
            </button>

            {
              user.id === userId && (
                <button
                  onClick={() => onDelte(id)}
                  style={styles.deleteButton}
                >
                  删除
                </button>
              )}
          </div>
        </div>
      </div>
    )
  }



  const tabs = [
    { type: 'hot', text: '最热' },
    { type: 'time', text: '最新' }
  ]

  const [type, setType] = useState('hot')

  const handleTabClick = (type: string) => {
    console.log(type)
    setType(type)

    //基于列表排序
    if (type === 'hot') {
      //根据点赞数排序
      setComments(lodash.orderBy(comments, 'likes', 'desc'))
    } else {
      //根据评论时间排序
      setComments(lodash.orderBy(comments, 'time', 'desc'))
    }
  }

  return (
    <div style={styles.container}>
      {/* 评论输入区域 */}
      <div style={styles.inputSection}>
        <h2 style={styles.title}>发表评论</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.commentEdit}>
            <img src={user.avatar} style={styles.avatarUser} />
            <textarea
              ref={textAreaRef}
              placeholder="发一条友善的评论"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              style={styles.textarea}
            />
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="submit"
              disabled={isLoading}
              style={styles.submitButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              {isLoading ? '发表中...' : '发表评论'}
            </button>
          </div>
        </form>
      </div>

      {/* 评论列表区域 */}
      <div style={styles.commentsSection}>
        <div style={styles.commentsHeader}>
          <h2 style={styles.title}>全部评论</h2>
          <li className="nav-sort">
            {tabs.map(tab => (
              <span className={classNames('nav-item', { active: type === tab.type })}
                style={styles.tab}
                key={tab.type} onClick={() => handleTabClick(tab.type)}>
                {tab.text}
              </span>)
            )}
          </li>
          <span style={styles.commentCount}>共 {comments.length} 条评论</span>
        </div>

        {comments.length === 0 ? (
          <div style={styles.emptyState}>
            <p>暂无评论，快来抢沙发吧~</p>
          </div>
        ) : (
          <div>
            {comments.map(comment => (
              <CommentItem comment={comment} onDelte={handleDelete} onLike={handleLike}></CommentItem>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 内联样式对象
const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  inputSection: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%'
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    color: '#333'
  },
  commentEdit: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'start',
  },
  textarea: {
    width: '95%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  buttonContainer: {
    marginTop: '15px',
    textAlign: 'right'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s'
  },
  commentsSection: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%'
  },
  commentsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f0f0f0'
  },
  commentCount: {
    color: '#999',
    fontSize: '14px'
  },
  commentItem: {
    display: 'flex',
    padding: '20px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover'
  },
  avatarUser: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover'
  },
  commentContent: {
    flex: 1
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap'
  },
  username: {
    fontWeight: 'bold',
    color: '#333',
    marginRight: '15px',
    fontSize: '14px'
  },
  time: {
    color: '#999',
    fontSize: '12px'
  },
  commentText: {
    margin: '0 0 10px 0',
    color: '#555',
    lineHeight: '1.5',
    fontSize: '14px'
  },
  commentActions: {
    display: 'flex',
    gap: '15px'
  },
  likedButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    backgroundColor: '#e5e8eb'
  },
  notLikedButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    backgroundColor: '#fff'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#e74c3c',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#999'
  }
};

// 如果使用 CSS 模块，可以添加以下样式（可选）
// CommentPage.css
/*

*/

export default CommentPage;