using UnityEngine;

/// <summary>
/// 检查点 - 玩家掉落时从这里重生
/// </summary>
public class Checkpoint : MonoBehaviour
{
    [SerializeField] private bool isStartPoint = false;
    
    private static Vector3 lastCheckpointPosition;
    private static bool hasCheckpoint = false;
    
    void Start()
    {
        // 如果是起点，设为默认重生点
        if (isStartPoint)
        {
            lastCheckpointPosition = transform.position;
            hasCheckpoint = true;
        }
    }
    
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            // 更新检查点
            lastCheckpointPosition = transform.position;
            hasCheckpoint = true;
            
            Debug.Log("检查点已激活！");
            
            // 视觉反馈：改变颜色
            Renderer rend = GetComponent<Renderer>();
            if (rend != null)
            {
                rend.material.color = Color.green;
            }
        }
    }
    
    /// <summary>
    /// 获取最后激活的检查点位置
    /// </summary>
    public static Vector3 GetLastCheckpointPosition()
    {
        return hasCheckpoint ? lastCheckpointPosition : Vector3.zero;
    }
    
    /// <summary>
    /// 是否有检查点
    /// </summary>
    public static bool HasCheckpoint()
    {
        return hasCheckpoint;
    }
}
