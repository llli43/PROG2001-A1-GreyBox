using UnityEngine;

/// <summary>
/// 掉落重置 - 当玩家掉落到Y轴以下时重置位置
/// </summary>
public class FallReset : MonoBehaviour
{
    [SerializeField] private float fallThreshold = -10f;
    
    private CharacterController controller;
    private Vector3 startPosition;
    
    void Start()
    {
        controller = GetComponent<CharacterController>();
        startPosition = transform.position;
    }
    
    void Update()
    {
        // 检测是否掉落
        if (transform.position.y < fallThreshold)
        {
            ResetPosition();
        }
    }
    
    /// <summary>
    /// 重置玩家位置到检查点或起点
    /// </summary>
    void ResetPosition()
    {
        // 临时禁用CharacterController以直接设置位置
        if (controller != null)
        {
            controller.enabled = false;
        }
        
        // 如果有检查点，回到检查点，否则回到起点
        if (Checkpoint.HasCheckpoint())
        {
            transform.position = Checkpoint.GetLastCheckpointPosition();
            Debug.Log("回到检查点！");
        }
        else
        {
            transform.position = startPosition;
            Debug.Log("回到起点！");
        }
        
        // 重新启用CharacterController
        if (controller != null)
        {
            controller.enabled = true;
        }
    }
}
